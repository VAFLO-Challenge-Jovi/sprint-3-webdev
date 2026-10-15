import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { NAV_SECTIONS } from '../../data/landing.js';
import { useAuth } from '../../hooks/useAuth.js';
import { useScrollSpy } from '../../hooks/useScrollSpy.js';

const SECTION_IDS = NAV_SECTIONS.map((section) => section.id);

export default function SiteHeader() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS, { enabled: location.pathname === '/' });

  const linkClass = (id) =>
    `rounded-full px-3.5 py-2 text-sm font-medium transition ${
      activeId === id ? 'bg-white/8 text-fg' : 'text-fg-muted hover:text-fg'
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-ink-950/75 backdrop-blur-xl">
      <nav className="container-page flex h-16 items-center justify-between gap-4" aria-label="Navegação principal">
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <Link to={{ pathname: '/', hash: section.id }} className={linkClass(section.id)} aria-current={activeId === section.id ? 'true' : undefined}>
                {section.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button to="/app" size="sm" iconRight={ArrowRight}>
              Abrir app
            </Button>
          ) : (
            <>
              <span className="hidden sm:block">
                <Button to="/login" variant="ghost" size="sm">
                  Entrar
                </Button>
              </span>
              <Button to="/app/scanner" size="sm">
                Testar agora
              </Button>
            </>
          )}
          <Button
            variant="secondary"
            size="icon"
            className="lg:hidden"
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      <nav
        id="mobile-menu"
        aria-label="Menu mobile"
        className={`container-page overflow-hidden transition-[max-height] duration-300 lg:hidden ${menuOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <ul className="grid gap-1 pb-4">
          {NAV_SECTIONS.map((section) => (
            <li key={section.id}>
              <Link to={{ pathname: '/', hash: section.id }} onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium text-fg-muted hover:bg-white/6 hover:text-fg">
                {section.label}
              </Link>
            </li>
          ))}
          {!isAuthenticated && (
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="block rounded-2xl px-4 py-3 text-base font-medium text-volt-300 hover:bg-white/6">
                Entrar na conta
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
