import { ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button.jsx';
import ScanFrame from '../components/ui/ScanFrame.jsx';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function NotFound() {
  useDocumentTitle('Página não encontrada');
  return (
    <main id="conteudo" className="container-page grid min-h-[70dvh] place-items-center py-20 text-center">
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid size-40 place-items-center">
          <ScanFrame className="inset-0" />
          <span className="font-display text-6xl font-extrabold text-volt-400">404</span>
        </div>
        <h1 className="text-3xl font-bold sm:text-4xl">Nenhum texto encontrado aqui</h1>
        <p className="max-w-md text-fg-muted">A página que você procura não existe ou mudou de endereço.</p>
        <Button to="/" icon={ArrowLeft}>
          Voltar para o início
        </Button>
      </div>
    </main>
  );
}
