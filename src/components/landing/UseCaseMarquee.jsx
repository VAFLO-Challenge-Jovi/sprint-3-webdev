import { USE_CASES } from '../../data/landing.js';

export default function UseCaseMarquee() {
  const items = [...USE_CASES, ...USE_CASES];
  return (
    <div className="relative overflow-hidden border-y border-white/6 bg-ink-900 py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <p className="sr-only">Funciona com: {USE_CASES.join(', ')}.</p>
      <ul className="flex w-max animate-marquee gap-10 pr-10" aria-hidden="true">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-10 font-display text-xl font-semibold whitespace-nowrap text-fg-muted">
            {item}
            <span className="size-2 rotate-45 bg-volt-400" />
          </li>
        ))}
      </ul>
    </div>
  );
}
