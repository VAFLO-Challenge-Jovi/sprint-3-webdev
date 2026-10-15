import { ArrowLeft, ChevronRight, Folder, Sparkles } from 'lucide-react';
import EmptyState from '../ui/EmptyState.jsx';

export default function NodeList({ breadcrumb, nodes, selectedId, canGoBack, onBack, onSelect }) {
  return (
    <section aria-label="Itens do tema" className="flex flex-col gap-3">
      <div className="flex min-h-9 items-center gap-2">
        {canGoBack && (
          <button type="button" onClick={onBack} aria-label="Voltar" className="grid size-8 place-items-center rounded-full bg-white/6 hover:bg-white/10">
            <ArrowLeft className="size-4" aria-hidden="true" />
          </button>
        )}
        <p className="truncate text-sm text-fg-muted">{breadcrumb.join(' / ')}</p>
      </div>

      {nodes.length === 0 ? (
        <EmptyState title="Nada por aqui">Tente outro termo ou tema.</EmptyState>
      ) : (
        <ul className="grid gap-2">
          {nodes.map((node) => {
            const active = node.id === selectedId;
            return (
              <li key={node.id}>
                <button
                  type="button"
                  onClick={() => onSelect(node)}
                  aria-current={active ? 'true' : undefined}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                    active ? 'border-volt-400/50 bg-volt-400/8' : 'border-white/8 bg-ink-850 hover:border-white/20'
                  }`}
                >
                  {node.children ? (
                    <Folder className="size-5 shrink-0 text-iris-300" aria-hidden="true" />
                  ) : node.own ? (
                    <Sparkles className="size-5 shrink-0 text-volt-400" aria-hidden="true" />
                  ) : null}
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{node.title}</span>
                    <span className="line-clamp-2 text-xs text-fg-subtle">{node.summary}</span>
                  </span>
                  {node.children && <ChevronRight className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
