import { ExternalLink } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import { formatDate } from '../../utils/format.js';

/** Study note: title, category, summary, key points and sources. */
export default function NoteCard({ note, actions }) {
  return (
    <article className="rounded-3xl border border-iris-400/30 bg-gradient-to-b from-iris-500/15 to-ink-850 p-5">
      <div className="flex flex-wrap gap-2">
        <Badge tone="iris">{note.category}</Badge>
        {note.createdAt && <Badge>{formatDate(note.createdAt)}</Badge>}
      </div>
      <h3 className="mt-3 text-xl leading-tight font-bold">{note.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-fg-muted">{note.summary}</p>

      {note.keyPoints?.length > 0 && (
        <>
          <h4 className="mt-5 mb-2 font-sans text-xs font-semibold tracking-widest text-fg-subtle uppercase">Pontos-chave</h4>
          <ul className="grid gap-2">
            {note.keyPoints.map((point) => (
              <li key={point} className="flex gap-2.5 text-sm">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-volt-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </>
      )}

      {note.sources?.length > 0 && (
        <>
          <h4 className="mt-5 mb-2 font-sans text-xs font-semibold tracking-widest text-fg-subtle uppercase">Fontes</h4>
          <ul className="grid gap-1.5">
            {note.sources.map((source) => (
              <li key={source.url}>
                <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-iris-300 hover:text-iris-200 hover:underline">
                  {source.title}
                  <ExternalLink className="size-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {actions && <div className="mt-5">{actions}</div>}
    </article>
  );
}
