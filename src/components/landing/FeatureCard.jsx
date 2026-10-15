const SPANS = {
  large: 'md:col-span-2 lg:row-span-2',
  tall: 'lg:row-span-2',
  wide: 'md:col-span-2',
  small: '',
};

const TONES = {
  volt: 'bg-volt-400 text-ink-950',
  iris: 'bg-iris-500 text-white',
  neutral: 'bg-white/8 text-fg',
};

function OcrPreview() {
  return (
    <div className="mt-6 rounded-2xl border border-white/8 bg-ink-950 p-4 font-mono text-sm" aria-hidden="true">
      <p className="text-fg-subtle">// texto reconhecido</p>
      <p className="mt-2 text-volt-300">
        Teorema de Pitágoras: a² + b² = c²
        <span className="ml-0.5 animate-caret">▍</span>
      </p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-fg-muted">PT</span>
        <span className="rounded-full bg-white/8 px-2.5 py-1 text-xs text-fg-muted">EN</span>
        <span className="rounded-full bg-volt-400/15 px-2.5 py-1 text-xs text-volt-300">pronto para pesquisar</span>
      </div>
    </div>
  );
}

function NotePreview() {
  return (
    <div className="mt-6 space-y-2 rounded-2xl bg-ink-950/40 p-4" aria-hidden="true">
      {['Definição e contexto', 'Pontos-chave', 'Fontes verificadas'].map((line) => (
        <div key={line} className="flex items-center gap-2 text-sm text-iris-200">
          <span className="size-1.5 rounded-full bg-volt-400" />
          {line}
        </div>
      ))}
    </div>
  );
}

function TopicsPreview() {
  return (
    <div className="mt-5 flex flex-wrap gap-2" aria-hidden="true">
      {['Matemática', 'Python', 'História', 'Livros', 'Inglês'].map((topic) => (
        <span key={topic} className="rounded-full border border-white/10 px-3 py-1 text-xs text-fg-muted">
          {topic}
        </span>
      ))}
    </div>
  );
}

const PREVIEWS = { large: OcrPreview, tall: NotePreview, wide: TopicsPreview };

/** Bento tile. `size` controls the grid span, `tone` the accent. */
export default function FeatureCard({ icon: Icon, title, text, size = 'small', tone }) {
  const Preview = PREVIEWS[size];
  const highlighted = tone === 'iris';

  return (
    <article
      className={`flex flex-col rounded-3xl border p-6 ${SPANS[size]} ${
        highlighted ? 'border-iris-400/40 bg-gradient-to-b from-iris-500/30 to-iris-500/5' : 'border-white/8 bg-ink-850'
      }`}
    >
      <div className={`grid size-11 place-items-center rounded-2xl ${TONES[tone || 'neutral']}`}>
        <Icon className="size-5" aria-hidden="true" />
      </div>
      <h3 className={`mt-5 font-bold ${size === 'large' ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>{title}</h3>
      <p className="mt-2 text-sm text-fg-muted">{text}</p>
      {Preview && <Preview />}
    </article>
  );
}
