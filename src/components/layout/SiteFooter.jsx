import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import GithubIcon from '../ui/GithubIcon.jsx';
import Logo from '../ui/Logo.jsx';
import { CONTACT, NAV_SECTIONS } from '../../data/landing.js';

export default function SiteFooter() {
  return (
    <footer className="border-t border-white/6 bg-ink-900">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4 sm:col-span-2">
          <Logo />
          <p className="max-w-sm text-sm text-fg-muted">
            A câmera do celular como ferramenta de estudo: OCR, pesquisa e notas inteligentes para estudantes full-time.
          </p>
          <div className="flex gap-2">
            <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub do time" className="grid size-10 place-items-center rounded-full bg-white/6 text-fg-muted hover:text-fg">
              <GithubIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Enviar e-mail" className="grid size-10 place-items-center rounded-full bg-white/6 text-fg-muted hover:text-fg">
              <Mail className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <nav aria-label="Seções da página">
          <h2 className="mb-4 font-sans text-xs font-semibold tracking-widest text-fg-subtle uppercase">Página</h2>
          <ul className="grid gap-2.5 text-sm">
            {NAV_SECTIONS.map((section) => (
              <li key={section.id}>
                <Link to={{ pathname: '/', hash: section.id }} className="text-fg-muted hover:text-fg">
                  {section.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Aplicativo">
          <h2 className="mb-4 font-sans text-xs font-semibold tracking-widest text-fg-subtle uppercase">App</h2>
          <ul className="grid gap-2.5 text-sm">
            <li><Link to="/app/scanner" className="text-fg-muted hover:text-fg">Scanner OCR</Link></li>
            <li><Link to="/app/historico" className="text-fg-muted hover:text-fg">Histórico</Link></li>
            <li><Link to="/app/perfil" className="text-fg-muted hover:text-fg">Meu perfil</Link></li>
            <li><Link to="/login" className="text-fg-muted hover:text-fg">Entrar / Criar conta</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container-page flex flex-col gap-2 border-t border-white/6 py-6 text-xs text-fg-subtle sm:flex-row sm:justify-between">
        <span>© 2026 SeekVision — Challenge JOVI · FIAP</span>
        <span>Sprint 4 · Front-End Design &amp; Web Development</span>
      </div>
    </footer>
  );
}
