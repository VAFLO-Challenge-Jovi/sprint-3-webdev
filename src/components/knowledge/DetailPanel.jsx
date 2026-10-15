import { MessageCircle } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';
import NoteCard from './NoteCard.jsx';

function toContext(item) {
  const detail = item.details || item;
  return {
    title: detail.title || item.title,
    category: detail.category || item.title,
    summary: detail.summary || item.summary || '',
    keyPoints: detail.keyPoints || [],
  };
}

export default function DetailPanel({ view, onChat }) {
  if (view.kind === 'empty') return null;

  const chatButton = (
    <Button variant="iris" icon={MessageCircle} onClick={() => onChat(toContext(view.node))}>
      Conversar com IA
    </Button>
  );

  if (view.kind === 'detail') {
    const detail = view.node.details;
    return (
      <div aria-live="polite" className="animate-fade-up">
        <NoteCard note={{ ...detail, category: detail.category || 'Estudos' }} actions={chatButton} />
      </div>
    );
  }

  return (
    <article aria-live="polite" className="flex flex-col items-start gap-4 rounded-3xl border border-white/8 bg-ink-850 p-6">
      <Badge tone={view.kind === 'branch' ? 'iris' : 'volt'}>{view.kind === 'branch' ? 'Subtema' : 'Tema'}</Badge>
      <h2 className="text-2xl font-bold">{view.node.title}</h2>
      <p className="text-fg-muted">{view.node.summary}</p>
      <p className="text-sm text-fg-subtle">Escolha um item na lista para ver a nota completa.</p>
      {chatButton}
    </article>
  );
}
