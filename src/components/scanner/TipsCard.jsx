import { Lightbulb } from 'lucide-react';

const TIPS = ['Boa iluminação, sem reflexo', 'Imagem nítida e reta', 'Enquadre só o trecho que importa', 'Texto impresso tem mais precisão'];

export default function TipsCard() {
  return (
    <aside aria-labelledby="tips-title" className="rounded-3xl border border-white/8 bg-ink-900 p-5">
      <h2 id="tips-title" className="flex items-center gap-2 font-sans text-sm font-semibold">
        <Lightbulb className="size-4 text-volt-400" aria-hidden="true" />
        Dicas para um OCR melhor
      </h2>
      <ul className="mt-3 grid gap-2 text-sm text-fg-muted">
        {TIPS.map((tip) => (
          <li key={tip} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-volt-400" aria-hidden="true" />
            {tip}
          </li>
        ))}
      </ul>
    </aside>
  );
}
