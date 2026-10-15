import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import ScanFrame from '../ui/ScanFrame.jsx';

export default function CtaBanner() {
  return (
    <section className="py-20" aria-labelledby="cta-title">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-4xl bg-volt-400 px-6 py-14 text-center text-ink-950 sm:px-12 lg:py-20">
          <ScanFrame className="inset-6 hidden sm:block" thickness="border-4" size="size-12" />
          <h2 id="cta-title" className="mx-auto max-w-3xl text-4xl leading-[1] font-extrabold sm:text-5xl lg:text-6xl">
            Sua próxima aula já pode ser escaneada.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base font-medium text-ink-800 sm:text-lg">
            Crie uma conta grátis e teste o OCR com qualquer foto ou com a câmera do seu celular.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/login?tab=cadastro" size="lg" variant="dark" iconRight={ArrowRight}>
              Criar conta grátis
            </Button>
            <Button to="/app/scanner" size="lg" variant="outline-dark">
              Abrir o scanner
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
