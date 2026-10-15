import { CircleAlert, GraduationCap, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import { PERSONA, USE_CASES } from '../../data/landing.js';

export default function PublicoAlvo() {
  return (
    <section id="publico-alvo" className="py-20 lg:py-28" aria-labelledby="publico-title">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-12">
        <article className="relative overflow-hidden rounded-4xl border border-iris-400/30 bg-gradient-to-br from-iris-500/25 via-ink-850 to-ink-850 p-6 sm:p-10 lg:col-span-5">
          <div className="absolute -top-16 -right-16 size-56 rounded-full bg-iris-500/30 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="grid size-16 place-items-center rounded-3xl bg-iris-500 text-white">
                <GraduationCap className="size-8" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest text-iris-300 uppercase">Persona</p>
                <h3 className="text-2xl font-bold">{PERSONA.name}</h3>
              </div>
            </div>

            <blockquote className="flex gap-3 text-lg text-fg">
              <Quote className="size-6 shrink-0 text-volt-400" aria-hidden="true" />
              <p>{PERSONA.quote}</p>
            </blockquote>

            <ul className="flex flex-wrap gap-2" aria-label="Características">
              {PERSONA.traits.map((trait) => (
                <li key={trait} className="rounded-full bg-white/8 px-3 py-1.5 text-sm text-fg-muted">
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="flex flex-col gap-10 lg:col-span-7 lg:justify-center">
          <SectionHeading
            id="publico-title"
            align="left"
            eyebrow="Público-Alvo"
            title="Feito para estudantes full-time"
            description="Um dos públicos do novo smartphone JOVI: jovens focados nos estudos, nas interações sociais e na autoexpressão. O celular é o que os mantém conectados — e a câmera pode ser a melhor ferramenta de estudo deles."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 font-sans text-sm font-semibold tracking-widest text-fg-subtle uppercase">Dores de hoje</h3>
              <ul className="grid gap-2.5">
                {PERSONA.pains.map((pain) => (
                  <li key={pain} className="flex items-start gap-2.5 text-sm text-fg-muted">
                    <CircleAlert className="mt-0.5 size-4 shrink-0 text-rose-300" aria-hidden="true" />
                    {pain}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-3 font-sans text-sm font-semibold tracking-widest text-fg-subtle uppercase">Onde usa</h3>
              <ul className="flex flex-wrap gap-2">
                {USE_CASES.slice(0, 6).map((useCase) => (
                  <li key={useCase} className="rounded-full border border-volt-400/25 px-3 py-1 text-xs font-medium text-volt-200">
                    {useCase}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
