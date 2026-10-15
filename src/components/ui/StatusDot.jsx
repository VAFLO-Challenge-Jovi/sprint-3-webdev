const COLORS = {
  ready: 'bg-fg-subtle',
  scanning: 'bg-amber-300 animate-pulse',
  done: 'bg-volt-400',
  error: 'bg-rose-400',
};

export default function StatusDot({ state = 'ready' }) {
  return <span className={`inline-block size-2.5 shrink-0 rounded-full ${COLORS[state] || COLORS.ready}`} aria-hidden="true" />;
}
