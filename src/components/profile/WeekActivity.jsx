/**
 * Single-series bar chart (scans per day, last 7 days).
 * One hue, no legend (title names the series), hover/focus tooltip per bar;
 * each bar is a labelled, focusable image for keyboard and screen-reader users.
 */
export default function WeekActivity({ week, max }) {
  return (
    <section aria-labelledby="week-title" className="rounded-3xl border border-white/8 bg-ink-850 p-5 sm:p-6">
      <h2 id="week-title" className="font-sans text-base font-semibold">Scans nos últimos 7 dias</h2>

      <div className="mt-6 grid h-44 grid-cols-7 items-end gap-2 border-b border-white/10 sm:gap-3">
        {week.map((day) => (
          <div
            key={day.label}
            tabIndex={0}
            role="img"
            aria-label={`${day.label}: ${day.count} scan${day.count === 1 ? '' : 's'}`}
            className="group relative flex h-full items-end justify-center rounded-md focus-visible:outline-2 focus-visible:outline-volt-400"
          >
            <div
              className="w-full max-w-10 rounded-t-[4px] bg-iris-400 transition group-hover:bg-iris-300 group-focus-visible:bg-iris-300"
              style={{ height: day.count ? `${Math.max(4, (day.count / max) * 100)}%` : '2px', opacity: day.count ? 1 : 0.35 }}
            />
            <span aria-hidden="true" className="pointer-events-none absolute -top-9 rounded-lg bg-ink-700 px-2 py-1 text-xs whitespace-nowrap text-fg opacity-0 shadow-lg transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {day.label}: {day.count} scan{day.count === 1 ? '' : 's'}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2 text-center text-xs text-fg-subtle sm:gap-3" aria-hidden="true">
        {week.map((day) => (
          <span key={day.label}>{day.label}</span>
        ))}
      </div>

    </section>
  );
}
