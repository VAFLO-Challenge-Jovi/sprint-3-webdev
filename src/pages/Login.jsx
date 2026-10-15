import { useSearchParams } from 'react-router-dom';
import { Check } from 'lucide-react';
import Logo from '../components/ui/Logo.jsx';
import ScanFrame from '../components/ui/ScanFrame.jsx';
import LoginForm from '../components/auth/LoginForm.jsx';
import RegisterForm from '../components/auth/RegisterForm.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../hooks/useToast.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import bookCover from '../assets/imgs/default-photo.jpg';

const PERKS = ['OCR real em português e inglês', 'Notas com fontes da Wikipédia e de livros', 'Histórico organizado por tema'];

export default function Login() {
  const [params, setParams] = useSearchParams();
  const tab = params.get('tab') === 'cadastro' ? 'register' : 'login';
  const { login, register } = useAuth();
  const showToast = useToast();
  useDocumentTitle(tab === 'login' ? 'Entrar' : 'Criar conta');

  function switchTab(next) {
    const nextParams = new URLSearchParams(params);
    if (next === 'register') nextParams.set('tab', 'cadastro');
    else nextParams.delete('tab');
    setParams(nextParams, { replace: true });
  }

  // After login/register, PublicOnlyRoute redirects to ?redirect= (or /app).
  async function handleLogin(values) {
    const user = await login(values);
    showToast(`Bem-vindo de volta, ${user.name.split(' ')[0]}!`, 'success');
  }

  async function handleRegister(values) {
    const user = await register(values);
    showToast(`Conta criada! Bem-vindo, ${user.name.split(' ')[0]}.`, 'success');
  }

  const tabClass = (name) =>
    `flex-1 rounded-full py-2.5 text-sm font-semibold transition ${tab === name ? 'bg-volt-400 text-ink-950' : 'text-fg-muted hover:text-fg'}`;

  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-ink-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute -top-32 -left-32 size-[30rem] rounded-full bg-iris-500/30 blur-[120px]" aria-hidden="true" />
        <Logo className="relative" />
        <div className="relative flex flex-col gap-8">
          <div className="relative mx-auto aspect-square w-72 overflow-hidden rounded-4xl border border-white/10" aria-hidden="true">
            <img src={bookCover} alt="" className="size-full object-cover" />
            <div className="absolute inset-x-5 h-0.5 animate-scan bg-volt-400 shadow-[0_0_24px_4px_var(--color-volt-400)]" />
            <ScanFrame className="inset-4" />
          </div>
          <h2 className="text-4xl leading-tight font-bold">
            Sua câmera, agora com <span className="text-volt-400">superpoderes de estudo.</span>
          </h2>
          <ul className="grid gap-3">
            {PERKS.map((perk) => (
              <li key={perk} className="flex items-center gap-3 text-fg-muted">
                <span className="grid size-6 place-items-center rounded-full bg-volt-400/15 text-volt-300">
                  <Check className="size-3.5" aria-hidden="true" />
                </span>
                {perk}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-fg-subtle">Challenge JOVI 2026 · FIAP</p>
      </aside>

      <main id="conteudo" className="flex flex-col px-4 py-8 sm:px-8">
        <Logo className="lg:hidden" />
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center gap-8 py-10">
          <div className="flex rounded-full bg-white/5 p-1 ring-1 ring-white/8" role="tablist" aria-label="Modo de acesso">
            <button type="button" role="tab" aria-selected={tab === 'login'} className={tabClass('login')} onClick={() => switchTab('login')}>
              Entrar
            </button>
            <button type="button" role="tab" aria-selected={tab === 'register'} className={tabClass('register')} onClick={() => switchTab('register')}>
              Criar conta
            </button>
          </div>

          {tab === 'login' ? (
            <LoginForm onLogin={handleLogin} onGoToRegister={() => switchTab('register')} />
          ) : (
            <RegisterForm onRegister={handleRegister} onGoToLogin={() => switchTab('login')} />
          )}
        </div>
      </main>
    </div>
  );
}
