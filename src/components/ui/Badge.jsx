const TONES = {
  volt: 'bg-volt-400/12 text-volt-300 ring-volt-400/25',
  iris: 'bg-iris-500/15 text-iris-300 ring-iris-400/30',
  neutral: 'bg-white/6 text-fg-muted ring-white/10',
  warning: 'bg-amber-400/12 text-amber-300 ring-amber-400/25',
};

export default function Badge({ tone = 'neutral', icon: Icon, children, className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${TONES[tone]} ${className}`}>
      {Icon && <Icon className="size-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}
