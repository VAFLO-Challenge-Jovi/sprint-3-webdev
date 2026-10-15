import { ArrowRight, Camera, CircleOff, FolderTree, Languages, Lightbulb, ScanText, Search, Sparkles } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading.jsx';
import FeatureCard from './FeatureCard.jsx';
import { FEATURES } from '../../data/landing.js';
import { Link } from 'react-router-dom';

const ICONS = { ScanText, Sparkles, Search, Languages, Camera, FolderTree };

export default function Solucao() {
  return (
    <section id="solucao" className="py-20 lg:py-28" aria-labelledby="solucao-title">
      <div className="container-page flex flex-col gap-14">
        <SectionHeading
          id="solucao-title"
          eyebrow="A Solução"
          title="A câmera que estuda com você"
          description="Repensamos a experiência da câmera JOVI para quem vive entre aula, trabalho e rolê: menos etapas entre ver um texto e entender o conteúdo."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <article className="rounded-3xl border border-white/8 bg-ink-900 p-6 sm:p-8">
            <div className="flex items-center gap-3 text-fg-subtle">
              <CircleOff className="size-5" aria-hidden="true" />
              <h3 className="font-sans text-sm font-semibold tracking-widest uppercase">O problema</h3>
            </div>
            <p className="mt-4 text-lg text-fg-muted">
              A maioria usa a câmera só no modo automático. Para pesquisar um trecho, o estudante tira foto, abre outro app,
              digita tudo de novo — e a foto se perde no meio da galeria.
            </p>
          </article>
          <article className="rounded-3xl border border-volt-400/30 bg-gradient-to-br from-volt-400/12 to-transparent p-6 sm:p-8">
            <div className="flex items-center gap-3 text-volt-300">
              <Lightbulb className="size-5" aria-hidden="true" />
              <h3 className="font-sans text-sm font-semibold tracking-widest uppercase">Nossa resposta</h3>
            </div>
            <p className="mt-4 text-lg text-fg">
              O SeekVision lê o texto direto da câmera e transforma em ação: pesquisar, traduzir, copiar ou gerar uma nota de
              estudo com fontes confiáveis — tudo salvo e organizado por tema.
            </p>
          </article>
        </div>

        <div className="grid auto-rows-[minmax(13rem,auto)] grid-flow-dense gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} icon={ICONS[feature.icon]} />
          ))}
          <Link
            to="/app/scanner"
            className="group flex flex-col justify-between rounded-3xl bg-volt-400 p-6 text-ink-950 transition hover:bg-volt-300"
          >
            <span className="font-display text-2xl leading-tight font-bold">Experimente agora, é grátis</span>
            <span className="flex items-center gap-2 text-sm font-semibold">
              Abrir o scanner
              <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
