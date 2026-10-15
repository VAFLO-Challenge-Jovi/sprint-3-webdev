export default function EmptyState({ icon: Icon, title, children, className = '' }) {
  return (
    <div className={`flex flex-col items-center gap-2 rounded-2xl border border-dashed border-white/10 px-4 py-8 text-center ${className}`}>
      {Icon && <Icon className="size-6 text-fg-subtle" aria-hidden="true" />}
      <p className="text-sm font-medium text-fg">{title}</p>
      {children && <p className="text-xs text-fg-subtle">{children}</p>}
    </div>
  );
}
