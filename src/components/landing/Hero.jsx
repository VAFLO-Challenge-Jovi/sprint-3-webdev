import { ArrowRight, BookOpen, Check, Languages, Sparkles } from 'lucide-react';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import ScanFrame from '../ui/ScanFrame.jsx';
import bookCover from '../../assets/imgs/default-photo.jpg';

const FACTS = [
  { icon: Languages, label: 'OCR em PT e EN' },
  { icon: BookOpen, label: 'Fontes: Wikipédia e livros' },
  { icon: Sparkles, label: 'Nota de estudo em segundos' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      <div className="bg-dots absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 size-[36rem] rounded-full bg-iris-500/25 blur-[120px]" aria-hidden="true" />
      <div className="absolute top-40 -right-40 size-[28rem] rounded-full bg-volt-400/10 blur-[120px]" aria-hidden="true" />

      <div className="container-page relative grid items-center gap-14 pt-14 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-28">
        <div className="flex animate-fade-up flex-col items-start gap-7 lg:col-span-6">
          <Badge tone="iris" icon={Sparkles}>
            Challenge JOVI 2026 · Câmera inteligente
          </Badge>

          <h1 id="hero-title" className="text-5xl leading-[0.95] font-extrabold sm:text-6xl xl:text-7xl">
            Aponte.
            <br />
            Entenda.
            <br />
            <span className="relative inline-block text-ink-950">
              <span className="absolute -inset-x-2 inset-y-1 -rotate-1 rounded-2xl bg-volt-400" aria-hidden="true" />
              <span className="relative">Aprenda.</span>
            </span>
          </h1>

          <p className="max-w-xl text-lg text-fg-muted">
            O SeekVision transforma a câmera do celular em ferramenta de estudo: reconhece o texto da lousa, do livro ou do
            slide e entrega pesquisa, tradução e uma nota com fontes — em um toque.
          </p>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button to="/app/scanner" size="lg" iconRight={ArrowRight}>
              Testar o scanner
            </Button>
            <Button to={{ pathname: '/', hash: 'como-funciona' }} variant="secondary" size="lg">
              Ver como funciona
            </Button>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-fg-muted">
            {FACTS.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="size-4 text-volt-400" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:col-span-6 lg:max-w-lg" aria-hidden="true">
          <div className="relative rounded-4xl border border-white/10 bg-ink-850 p-3 shadow-[0_40px_120px_-30px_var(--color-iris-500)]">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              <img src={bookCover} alt="" className="size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950/50 to-transparent" />
              <div className="absolute top-[12%] left-[22%] h-[24%] w-[56%] rounded-xl border-2 border-volt-400 bg-volt-400/10" />
              <div className="absolute inset-x-6 h-0.5 animate-scan bg-volt-400 shadow-[0_0_24px_4px_var(--color-volt-400)]" />
              <ScanFrame className="inset-5" />
            </div>
          </div>

          <div className="absolute -top-5 -left-3 flex animate-float items-center gap-2 rounded-2xl border border-white/10 bg-ink-800/95 px-4 py-3 text-sm font-semibold shadow-xl backdrop-blur sm:-left-10">
            <span className="grid size-6 place-items-center rounded-full bg-volt-400 text-ink-950">
              <Check className="size-4" />
            </span>
            Texto detectado
          </div>

          <div className="absolute -right-2 -bottom-8 w-64 animate-float rounded-3xl border border-white/10 bg-ink-800/95 p-4 shadow-xl backdrop-blur [animation-delay:-3s] sm:-right-10">
            <p className="text-xs font-semibold tracking-widest text-iris-300 uppercase">Nota gerada</p>
            <p className="mt-1 font-display text-base font-bold leading-tight">The Photography Storytelling Workshop</p>
            <div className="mt-3 flex gap-1.5">
              <span className="rounded-full bg-iris-500/20 px-2.5 py-0.5 text-[11px] font-semibold text-iris-300">Livros</span>
              <span className="rounded-full bg-white/8 px-2.5 py-0.5 text-[11px] text-fg-muted">3 fontes</span>
            </div>
            <div className="mt-3 space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-white/10" />
              <div className="h-1.5 w-4/5 rounded-full bg-white/10" />
              <div className="h-1.5 w-3/5 rounded-full bg-white/10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
