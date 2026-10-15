import { initials } from '../../utils/format.js';

const ACCENTS = {
  volt: 'bg-volt-400 text-ink-950',
  iris: 'bg-iris-500 text-white',
};

export default function TeamCard({ name, rm, role, bio, accent = 'volt' }) {
  return (
    <article className="flex h-full flex-col gap-4 rounded-3xl border border-white/8 bg-ink-850 p-6 transition hover:-translate-y-1 hover:border-white/20">
      <div className={`grid size-14 place-items-center rounded-2xl font-display text-lg font-bold ${ACCENTS[accent]}`} aria-hidden="true">
        {initials(name)}
      </div>
      <div>
        <h3 className="text-lg leading-tight font-bold">{name}</h3>
        <p className="mt-1 text-sm font-semibold text-volt-300">{role}</p>
      </div>
      <p className="text-sm text-fg-muted">{bio}</p>
      <p className="mt-auto font-mono text-xs text-fg-subtle">{rm}</p>
    </article>
  );
}
