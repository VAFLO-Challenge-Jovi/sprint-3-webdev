import { startTransition } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FolderTree, LogOut, ScanText, UserRound } from 'lucide-react';
import Logo from '../ui/Logo.jsx';
import Button from '../ui/Button.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { initials } from '../../utils/format.js';

const APP_NAV = [
  { to: '/app/scanner', label: 'Scanner', icon: ScanText },
  { to: '/app/historico', label: 'Histórico', icon: FolderTree },
  { to: '/app/perfil', label: 'Perfil', icon: UserRound },
];

/** Shell of the private area: top bar on desktop, bottom tab bar on mobile. */
export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    // React Router navigates inside a transition; doing the logout in the same transition
    // makes both updates render together (otherwise PrivateRoute would bounce to /login).
    startTransition(() => {
      navigate('/', { replace: true });
      logout();
    });
  }

  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-40 border-b border-white/6 bg-ink-950/80 backdrop-blur-xl">
        <div className="container-page flex h-16 items-center justify-between gap-4">
          <Logo to="/" />

          <nav aria-label="Navegação do app" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full bg-white/4 p-1 ring-1 ring-white/8">
              {APP_NAV.map(({ to, label, icon: Icon }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                        isActive ? 'bg-volt-400 text-ink-950' : 'text-fg-muted hover:text-fg'
                      }`
                    }
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <NavLink to="/app/perfil" className="flex items-center gap-2.5 rounded-full py-1 pr-1 pl-1 sm:pr-4" aria-label="Meu perfil">
              <span className="grid size-9 place-items-center rounded-full bg-iris-500 text-xs font-bold text-white">{initials(user.name)}</span>
              <span className="hidden max-w-36 truncate text-sm font-medium sm:block">{user.name}</span>
            </NavLink>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Sair da conta" title="Sair">
              <LogOut className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>

      <main id="conteudo" className="container-page pt-6 pb-28 md:pt-10 md:pb-16">
        <Outlet />
      </main>

      <nav aria-label="Navegação do app (mobile)" className="fixed inset-x-3 bottom-3 z-40 md:hidden">
        <ul className="grid grid-cols-3 gap-1 rounded-3xl border border-white/10 bg-ink-850/95 p-1.5 shadow-2xl backdrop-blur-xl">
          {APP_NAV.map(({ to, label, icon: Icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold transition ${
                    isActive ? 'bg-volt-400 text-ink-950' : 'text-fg-muted'
                  }`
                }
              >
                <Icon className="size-5" aria-hidden="true" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
