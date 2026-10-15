import { Outlet } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import SiteFooter from './SiteFooter.jsx';

export default function PublicLayout() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-volt-400 focus:px-4 focus:py-2 focus:text-ink-950">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </>
  );
}
