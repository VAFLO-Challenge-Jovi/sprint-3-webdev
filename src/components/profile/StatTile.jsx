export default function StatTile({ label, value, hint, icon: Icon }) {
  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-white/8 bg-ink-850 p-5">
      <div className="flex items-center justify-between text-fg-muted">
        <span className="text-sm">{label}</span>
        {Icon && <Icon className="size-4" aria-hidden="true" />}
      </div>
      <p className="font-display text-4xl font-bold tabular-nums">{value}</p>
      {hint && <p className="text-xs text-fg-subtle">{hint}</p>}
    </div>
  );
}
