import { Link } from 'react-router-dom';
import { FileText, Inbox, Sparkles, Trash2 } from 'lucide-react';
import EmptyState from '../ui/EmptyState.jsx';
import { relativeTime, truncate } from '../../utils/format.js';

export default function RecentScans({ scans, loading, error, onSelect, onDelete, onClearAll }) {
  const recent = scans.slice(0, 6);

  return (
    <section aria-labelledby="recent-title" className="rounded-4xl border border-white/8 bg-ink-850 p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 id="recent-title" className="text-lg font-bold">Recentes</h2>
        <div className="flex items-center gap-1">
          <Link to="/app/historico" className="rounded-full px-3 py-1.5 text-xs font-semibold text-volt-300 hover:bg-white/6">
            Ver tudo
          </Link>
          {scans.length > 0 && (
            <button type="button" onClick={onClearAll} className="rounded-full px-3 py-1.5 text-xs font-semibold text-fg-subtle hover:bg-white/6 hover:text-rose-300">
              Limpar
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <ul className="grid gap-2" aria-busy="true" aria-label="Carregando histórico">
          {[0, 1, 2].map((i) => (
            <li key={i} className="h-16 animate-pulse rounded-2xl bg-white/5" />
          ))}
        </ul>
      ) : error ? (
        <EmptyState icon={Inbox} title="Não foi possível carregar seu histórico">
          {error.message}
        </EmptyState>
      ) : recent.length === 0 ? (
        <EmptyState icon={Inbox} title="Nenhum scan salvo ainda">
          Salve um texto ou gere uma nota para vê-lo aqui.
        </EmptyState>
      ) : (
        <ul className="grid gap-2">
          {recent.map((scan) => {
            const Icon = scan.kind === 'analysis' ? Sparkles : FileText;
            return (
              <li key={scan.id} className="group flex items-center gap-3 rounded-2xl bg-white/4 p-3 transition hover:bg-white/8">
                <span className={`grid size-10 shrink-0 place-items-center rounded-xl ${scan.kind === 'analysis' ? 'bg-iris-500/20 text-iris-300' : 'bg-volt-400/15 text-volt-300'}`}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <button type="button" onClick={() => onSelect(scan)} className="min-w-0 flex-1 text-left" title="Restaurar este texto">
                  <p className="truncate text-sm font-medium">{truncate(scan.title || scan.text, 60)}</p>
                  <p className="text-xs text-fg-subtle">{relativeTime(scan.createdAt)}</p>
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(scan)}
                  aria-label="Excluir do histórico"
                  className="grid size-9 place-items-center rounded-xl text-fg-subtle opacity-100 transition hover:bg-rose-500/15 hover:text-rose-300 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"
                >
                  <Trash2 className="size-4" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
