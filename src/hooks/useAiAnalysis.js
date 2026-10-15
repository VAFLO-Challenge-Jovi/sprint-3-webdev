import { useCallback, useRef, useState } from 'react';
import { findWikipediaSummary } from '../services/wikipediaApi.js';
import { searchBooks } from '../services/booksApi.js';
import { buildStudyNote, toSearchQuery } from '../services/studyNotes.js';
import { offlineStudyNote } from '../services/mockKnowledgeAI.js';

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const READY = { state: 'ready', text: 'Pronto para analisar o texto.' };

/**
 * "Analisar com IA" pipeline: OCR text → Wikipedia + books (Google Books / Open Library) → study note.
 * Each stage is shown as a chat message; if both APIs fail it falls back
 * to an offline note so the flow never breaks.
 */
export function useAiAnalysis({ onSave } = {}) {
  const [open, setOpen] = useState(false);
  const [running, setRunning] = useState(false);
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState(READY);
  const [note, setNote] = useState(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const tokenRef = useRef(0);
  const messageIdRef = useRef(0);

  const pushMessage = (text, state) => {
    const id = ++messageIdRef.current;
    setMessages((prev) => [...prev, { id, text, state }]);
    return id;
  };
  const updateMessage = (id, patch) =>
    setMessages((prev) => prev.map((message) => (message.id === id ? { ...message, ...patch } : message)));

  async function stage(token, label, task, failLabel) {
    const id = pushMessage(label, 'loading');
    setStatus({ state: 'scanning', text: label });
    try {
      const result = await task();
      if (token === tokenRef.current) updateMessage(id, { state: 'done' });
      return result;
    } catch {
      if (token === tokenRef.current) updateMessage(id, { state: 'warning', text: failLabel });
      return null;
    }
  }

  const analyze = useCallback(async (text) => {
    if (!text) return;
    if (note && note.text === text) {
      setOpen(true);
      return;
    }

    const token = ++tokenRef.current;
    const query = toSearchQuery(text) || text.slice(0, 80);
    setOpen(true);
    setRunning(true);
    setMessages([]);
    setNote(null);
    setSaved(false);

    await stage(token, 'Lendo o texto reconhecido...', () => wait(450));
    const wiki = await stage(token, 'Buscando na Wikipédia...', () => findWikipediaSummary(query), 'Wikipédia indisponível — seguindo sem ela');
    if (token !== tokenRef.current) return;
    const books = await stage(token, 'Buscando livros (Google Books / Open Library)...', () => searchBooks(query), 'Bases de livros indisponíveis — seguindo sem elas');
    if (token !== tokenRef.current) return;
    await stage(token, 'Gerando sua nota de estudo...', () => wait(500));
    if (token !== tokenRef.current) return;

    const apisDown = wiki === null && books === null;
    const result = apisDown ? offlineStudyNote(text) : buildStudyNote({ text, wiki, books: books || [] });
    if (apisDown) pushMessage('Sem conexão com as fontes — nota criada em modo offline.', 'warning');

    setNote(result);
    setRunning(false);
    setStatus({ state: 'done', text: 'Análise concluída. Revise a nota gerada.' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note]);

  const save = useCallback(async () => {
    if (!note || saved || saving) return;
    setSaving(true);
    try {
      await onSave?.(note);
      setSaved(true);
    } catch {
      // The caller already reported the error (toast); keep "Salvar" enabled to retry.
    } finally {
      setSaving(false);
    }
  }, [note, saved, saving, onSave]);

  const reset = useCallback(() => {
    tokenRef.current++;
    setOpen(false);
    setRunning(false);
    setMessages([]);
    setNote(null);
    setSaved(false);
    setStatus(READY);
  }, []);

  return {
    open,
    running,
    messages,
    status,
    note,
    saved,
    saving,
    analyze,
    save,
    reset,
    openDrawer: () => setOpen(true),
    closeDrawer: () => setOpen(false),
  };
}
