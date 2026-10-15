/* ============================================================
   OFFLINE FALLBACK
   Used only when Wikipedia and the book APIs can't be reached, so the
   demo never breaks (e.g. bad Wi-Fi during the pitch).
   ============================================================ */
import { truncate } from '../utils/format.js';

const DEMO_BOOK = {
  title: 'The Photography Storytelling Workshop',
  category: 'Livros',
  summary:
    'Guia de Finn Beales sobre narrativa visual: como planejar, fotografar e editar séries de imagens que contam uma história com começo, meio e fim.',
  keyPoints: [
    'Livro identificado a partir da capa',
    'Tema principal: storytelling visual em fotografia',
    'Cinco etapas: história, preparação, produção, edição e publicação',
  ],
};

export function offlineStudyNote(text) {
  const isDemo = /photography|storytelling/i.test(text);
  const base = isDemo
    ? DEMO_BOOK
    : {
        title: truncate(text.split('\n')[0], 60),
        category: 'Estudos',
        summary: 'Nota criada em modo offline. Conecte-se à internet para enriquecer com Wikipédia e bases de livros.',
        keyPoints: [`Texto reconhecido: “${truncate(text, 70)}”`],
      };

  return {
    kind: 'analysis',
    text,
    ...base,
    sources: [{ title: `Pesquisar “${truncate(text, 40)}” no Google`, url: `https://www.google.com/search?q=${encodeURIComponent(text)}` }],
    books: [],
    offline: true,
    createdAt: new Date().toISOString(),
  };
}
