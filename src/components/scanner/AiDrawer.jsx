import { BookOpen, Check, ExternalLink, FolderTree, LoaderCircle, Save, TriangleAlert } from 'lucide-react';
import Drawer from '../ui/Drawer.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import StatusDot from '../ui/StatusDot.jsx';
import NoteCard from '../knowledge/NoteCard.jsx';

const MESSAGE_ICON = {
  loading: <LoaderCircle className="size-4 animate-spin text-fg-subtle" aria-hidden="true" />,
  done: <Check className="size-4 text-volt-400" aria-hidden="true" />,
  warning: <TriangleAlert className="size-4 text-amber-300" aria-hidden="true" />,
};

export default function AiDrawer({ ai }) {
  return (
    <Drawer
      open={ai.open}
      onClose={ai.closeDrawer}
      eyebrow="IA · Wikipédia + livros"
      title="Análise inteligente"
      footer={
        <div className="grid gap-2 sm:grid-cols-2">
          <Button block icon={ai.saved ? Check : Save} loading={ai.saving} disabled={!ai.note || ai.saved} onClick={ai.save}>
            {ai.saved ? 'Nota salva' : 'Salvar nota'}
          </Button>
          <Button block variant="secondary" icon={FolderTree} to="/app/historico">
            Abrir histórico
          </Button>
        </div>
      }
    >
      <p className="flex items-center gap-2 text-sm text-fg-muted" aria-live="polite">
        <StatusDot state={ai.status.state} />
        {ai.status.text}
      </p>

      <ol className="grid gap-2">
        {ai.messages.map((message) => (
          <li key={message.id} className="flex items-center gap-3 rounded-2xl bg-white/4 px-4 py-3 text-sm">
            {MESSAGE_ICON[message.state]}
            <span className={message.state === 'loading' ? 'text-fg-muted' : 'text-fg'}>{message.text}</span>
          </li>
        ))}
      </ol>

      {ai.note && (
        <div className="animate-fade-up space-y-3">
          <NoteCard note={ai.note} />
          {ai.note.offline && <Badge tone="warning">Modo offline</Badge>}
          {ai.note.books?.length > 0 && (
            <section aria-labelledby="books-title" className="rounded-3xl border border-white/8 bg-ink-850 p-4">
              <h3 id="books-title" className="mb-3 flex items-center gap-2 font-sans text-sm font-semibold">
                <BookOpen className="size-4 text-iris-300" aria-hidden="true" />
                Livros relacionados
              </h3>
              <ul className="grid gap-2">
                {ai.note.books.map((book) => (
                  <li key={book.id}>
                    <a href={book.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-2xl p-2 hover:bg-white/5">
                      {book.thumbnail ? (
                        <img src={book.thumbnail} alt="" className="h-14 w-10 shrink-0 rounded-md object-cover" loading="lazy" />
                      ) : (
                        <span className="grid h-14 w-10 shrink-0 place-items-center rounded-md bg-white/8">
                          <BookOpen className="size-4 text-fg-subtle" aria-hidden="true" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="line-clamp-2 text-sm font-medium">{book.title}</span>
                        <span className="block truncate text-xs text-fg-subtle">
                          {[book.authors.join(', '), book.year].filter(Boolean).join(' · ')}
                        </span>
                      </span>
                      <ExternalLink className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      )}
    </Drawer>
  );
}
