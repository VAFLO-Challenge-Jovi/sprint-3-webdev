import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import PasswordToggle from './PasswordToggle.jsx';
import { useForm } from '../../hooks/useForm.js';
import { isEmail } from '../../utils/validators.js';
import { TEST_ACCOUNT } from '../../services/api/seed.js';


function validate(values) {
  const errors = {};
  if (!isEmail(values.email)) errors.email = 'Insira um e-mail válido.';
  if (values.password.length < 6) errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  return errors;
}

export default function LoginForm({ onLogin, onGoToRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const { field, setValues, handleSubmit, submitting, formError } = useForm({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: onLogin,
  });

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de login" className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo de volta</h1>
        <p className="mt-2 text-sm text-fg-muted">Entre para acessar o scanner e o seu histórico.</p>
      </div>

      <button
        type="button"
        onClick={() => setValues(TEST_ACCOUNT)}
        className="flex items-center gap-3 rounded-2xl border border-dashed border-volt-400/40 bg-volt-400/5 p-4 text-left text-sm transition hover:bg-volt-400/10"
      >
        <KeyRound className="size-5 shrink-0 text-volt-400" aria-hidden="true" />
        <span>
          <span className="font-semibold text-fg">Usar conta de teste</span>
          <span className="block text-fg-muted">
            {TEST_ACCOUNT.email} · {TEST_ACCOUNT.password}
          </span>
        </span>
      </button>

      <TextField label="E-mail" type="email" placeholder="voce@email.com" autoComplete="email" {...field('email')} />
      <TextField
        label="Senha"
        type={showPassword ? 'text' : 'password'}
        placeholder="Sua senha"
        autoComplete="current-password"
        right={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
        {...field('password')}
      />

      {formError && (
        <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300" role="alert">
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" block loading={submitting}>
        Entrar
      </Button>

      <p className="text-center text-sm text-fg-muted">
        Não tem conta?{' '}
        <button type="button" onClick={onGoToRegister} className="font-semibold text-volt-300 hover:underline">
          Criar conta grátis
        </button>
      </p>
    </form>
  );
}
