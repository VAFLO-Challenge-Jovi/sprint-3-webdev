import SectionHeading from '../ui/SectionHeading.jsx';
import { STEPS } from '../../data/landing.js';

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-ink-900 py-20 lg:py-28" aria-labelledby="como-title">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          id="como-title"
          eyebrow="Como funciona"
          tone="iris"
          title="Do texto à nota em 4 passos"
          description="Pensado para os 5 minutos entre uma aula e outra."
        />

        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative rounded-3xl border border-white/8 bg-ink-850 p-6">
              <span className="font-display text-6xl font-extrabold text-transparent [-webkit-text-stroke:1.5px_var(--color-volt-400)]">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl font-bold">{step.title}</h3>
              <p className="mt-2 text-sm text-fg-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
