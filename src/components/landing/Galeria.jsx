import { ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import Button from '../ui/Button.jsx';
import ScanFrame from '../ui/ScanFrame.jsx';
import PhoneFrame from '../ui/PhoneFrame.jsx';
import { GALLERY } from '../../data/landing.js';
import { useCarousel } from '../../hooks/useCarousel.js';

export default function Galeria() {
  const { index, goTo, next, prev, bind } = useCarousel({ count: GALLERY.length, interval: 4500 });

  return (
    <section id="galeria" className="overflow-hidden bg-ink-900 py-20 lg:py-28" aria-labelledby="galeria-title">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          id="galeria-title"
          eyebrow="Galeria"
          title="O SeekVision em ação"
          description="Do enquadramento ao resultado: o fluxo real testado com um livro da biblioteca."
        />

        <div
          className="grid items-center gap-8 lg:grid-cols-12"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Etapas do SeekVision"
          tabIndex={0}
          {...bind}
        >
          <div className="relative grid h-[30rem] place-items-center rounded-4xl border border-white/8 bg-ink-850 p-6 sm:h-[34rem] lg:col-span-7">
            <div className="absolute inset-0 rounded-4xl bg-[radial-gradient(circle_at_50%_40%,var(--color-iris-500)_0%,transparent_60%)] opacity-25" aria-hidden="true" />
            {GALLERY.map((item, i) => (
              <figure
                key={item.src}
                className={`absolute inset-6 grid place-items-center transition-all duration-500 ${
                  i === index ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
                }`}
                aria-hidden={i !== index}
              >
                {item.device === 'phone' ? (
                  <PhoneFrame src={item.src} alt={item.alt} className="h-full" />
                ) : (
                  <div className="relative aspect-square h-full max-h-full max-w-full overflow-hidden rounded-3xl">
                    <img src={item.src} alt={item.alt} className="size-full object-cover" loading="lazy" />
                    <ScanFrame className="inset-4" />
                  </div>
                )}
                <figcaption className="sr-only">{item.caption}</figcaption>
              </figure>
            ))}
          </div>

          <div className="flex flex-col gap-3 lg:col-span-5">
            <ol className="grid grid-cols-2 gap-3 lg:grid-cols-1" role="tablist" aria-label="Escolher etapa">
              {GALLERY.map((item, i) => (
                <li key={item.src}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => goTo(i)}
                    className={`flex w-full items-center gap-4 rounded-2xl border p-3 text-left transition sm:p-4 ${
                      i === index ? 'border-volt-400/50 bg-volt-400/10' : 'border-white/8 bg-ink-850 hover:border-white/20'
                    }`}
                  >
                    <span className={`font-display text-2xl font-extrabold ${i === index ? 'text-volt-400' : 'text-fg-subtle'}`}>{item.step}</span>
                    <span className="text-sm font-semibold sm:text-base">{item.caption}</span>
                  </button>
                </li>
              ))}
            </ol>
            <div className="mt-2 flex items-center gap-3">
              <Button variant="secondary" size="icon" onClick={prev} aria-label="Etapa anterior">
                <ChevronLeft className="size-5" aria-hidden="true" />
              </Button>
              <Button variant="secondary" size="icon" onClick={next} aria-label="Próxima etapa">
                <ChevronRight className="size-5" aria-hidden="true" />
              </Button>
              <div className="ml-2 h-1 flex-1 overflow-hidden rounded-full bg-white/8" aria-hidden="true">
                <div className="h-full rounded-full bg-volt-400 transition-all duration-500" style={{ width: `${((index + 1) / GALLERY.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
