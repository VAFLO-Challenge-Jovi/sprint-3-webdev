import Hero from '../components/landing/Hero.jsx';
import UseCaseMarquee from '../components/landing/UseCaseMarquee.jsx';
import Solucao from '../components/landing/Solucao.jsx';
import ComoFunciona from '../components/landing/ComoFunciona.jsx';
import PublicoAlvo from '../components/landing/PublicoAlvo.jsx';
import Galeria from '../components/landing/Galeria.jsx';
import Equipe from '../components/landing/Equipe.jsx';
import Contato from '../components/landing/Contato.jsx';
import CtaBanner from '../components/landing/CtaBanner.jsx';
import { useHashScroll } from '../hooks/useHashScroll.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';

export default function Landing() {
  useDocumentTitle(null);
  useHashScroll();

  return (
    <main id="conteudo">
      <Hero />
      <UseCaseMarquee />
      <Solucao />
      <ComoFunciona />
      <PublicoAlvo />
      <Galeria />
      <Equipe />
      <Contato />
      <CtaBanner />
    </main>
  );
}
