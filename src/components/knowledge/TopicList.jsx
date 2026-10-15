export default function TopicList({ topics, selectedId, onSelect }) {
  return (
    <nav aria-label="Temas">
      <h2 className="mb-3 hidden font-sans text-xs font-semibold tracking-widest text-fg-subtle uppercase lg:block">Temas</h2>
      <ul className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0">
        {topics.map((topic) => {
          const active = topic.id === selectedId;
          return (
            <li key={topic.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(topic.id)}
                aria-current={active ? 'true' : undefined}
                className={`flex w-full items-center justify-between gap-3 rounded-full px-4 py-2.5 text-left text-sm font-semibold transition lg:rounded-2xl lg:py-3 ${
                  active ? 'bg-volt-400 text-ink-950' : 'bg-white/5 text-fg-muted hover:bg-white/10 hover:text-fg'
                }`}
              >
                <span className="whitespace-nowrap">{topic.title}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ${active ? 'bg-ink-950/15' : 'bg-white/8'}`}>{topic.children.length}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
