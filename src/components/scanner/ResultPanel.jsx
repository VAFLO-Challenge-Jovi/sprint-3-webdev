import { Bookmark, BookmarkCheck, Copy, Languages, Search, Sparkles } from 'lucide-react';
import Button from '../ui/Button.jsx';
import StatusDot from '../ui/StatusDot.jsx';

const ACTIONS = [
  { key: 'search', label: 'Pesquisar', icon: Search },
  { key: 'translate', label: 'Traduzir', icon: Languages },
  { key: 'copy', label: 'Copiar', icon: Copy },
];

export default function ResultPanel({ status, output, running, hasText, saved, analyzing, onAction, onSave, onAnalyze }) {
  return (
    <section aria-labelledby="result-title" className="flex flex-col gap-4 rounded-4xl border border-white/8 bg-ink-850 p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <h2 id="result-title" className="text-lg font-bold whitespace-nowrap">Texto detectado</h2>
        <p className="flex items-center gap-2 text-xs text-fg-muted" aria-live="polite">
          <StatusDot state={status.state} />
          {status.text}
        </p>
      </div>

      <div className="max-h-56 min-h-28 overflow-y-auto rounded-2xl border border-white/6 bg-ink-950 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap text-volt-200" aria-label="Texto reconhecido pelo OCR">
        {output || <span className="text-fg-subtle">{running ? 'Lendo a imagem...' : 'Envie uma imagem ou use a câmera.'}</span>}
        {running && output && <span className="animate-caret">▍</span>}
      </div>

      <Button variant="iris" size="lg" block icon={Sparkles} loading={analyzing} disabled={!hasText || running} onClick={onAnalyze}>
        {analyzing ? 'Analisando...' : 'Gerar nota com IA'}
      </Button>

      <div className="grid grid-cols-4 gap-2">
        {ACTIONS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            disabled={!hasText || running}
            onClick={() => onAction(key)}
            className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 py-3 text-xs font-semibold text-fg-muted transition hover:bg-white/10 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </button>
        ))}
        <button
          type="button"
          disabled={!hasText || running || saved}
          onClick={onSave}
          className="flex flex-col items-center gap-1.5 rounded-2xl bg-white/5 py-3 text-xs font-semibold text-fg-muted transition hover:bg-white/10 hover:text-fg disabled:pointer-events-none disabled:opacity-40"
        >
          {saved ? <BookmarkCheck className="size-5 text-volt-400" aria-hidden="true" /> : <Bookmark className="size-5" aria-hidden="true" />}
          {saved ? 'Salvo' : 'Salvar'}
        </button>
      </div>
    </section>
  );
}
