import EmptyState from '../ui/EmptyState.jsx';

/** Share of saved items per category: label + value in text color, bar in one hue. */
export default function CategoryBreakdown({ categories }) {
  return (
    <section aria-labelledby="categories-title" className="rounded-3xl border border-white/8 bg-ink-850 p-5 sm:p-6">
      <h2 id="categories-title" className="font-sans text-base font-semibold">Por categoria</h2>
      {categories.length === 0 ? (
        <EmptyState title="Sem dados ainda" className="mt-4">Salve textos e notas no scanner.</EmptyState>
      ) : (
        <ul className="mt-5 grid gap-4">
          {categories.map((category) => (
            <li key={category.name}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{category.name}</span>
                <span className="text-fg-muted tabular-nums">
                  {category.count} · {category.percent}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/6" aria-hidden="true">
                <div className="h-full rounded-full bg-iris-400" style={{ width: `${category.percent}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
