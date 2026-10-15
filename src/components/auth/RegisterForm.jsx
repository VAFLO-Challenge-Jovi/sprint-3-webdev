import { useState } from 'react';
import TextField from '../ui/TextField.jsx';
import Button from '../ui/Button.jsx';
import PasswordToggle from './PasswordToggle.jsx';
import PasswordStrength from './PasswordStrength.jsx';
import { useForm } from '../../hooks/useForm.js';
import { isEmail } from '../../utils/validators.js';

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Informe seu nome.';
  if (!isEmail(values.email)) errors.email = 'Insira um e-mail válido.';
  if (values.password.length < 6) errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  if (!values.confirm || values.confirm !== values.password) errors.confirm = 'As senhas não coincidem.';
  return errors;
}

export default function RegisterForm({ onRegister, onGoToLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const { values, field, handleSubmit, submitting, formError } = useForm({
    initialValues: { name: '', email: '', password: '', confirm: '' },
    validate,
    onSubmit: onRegister,
  });

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Formulário de cadastro" className="flex flex-col gap-5">
      <div>
        <h1 className="text-3xl font-bold">Crie sua conta</h1>
        <p className="mt-2 text-sm text-fg-muted">Leva 20 segundos. Seus scans ficam salvos na sua conta.</p>
      </div>

      <TextField label="Nome completo" placeholder="Seu nome" autoComplete="name" {...field('name')} />
      <TextField label="E-mail" type="email" placeholder="voce@email.com" autoComplete="email" {...field('email')} />
      <div className="flex flex-col gap-2">
        <TextField
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="Crie uma senha"
          autoComplete="new-password"
          right={<PasswordToggle visible={showPassword} onToggle={() => setShowPassword((v) => !v)} />}
          {...field('password')}
        />
        <PasswordStrength password={values.password} />
      </div>
      <TextField label="Confirmar senha" type="password" placeholder="Repita a senha" autoComplete="new-password" {...field('confirm')} />

      {formError && (
        <p className="rounded-2xl bg-rose-500/10 px-4 py-3 text-sm text-rose-300" role="alert">
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" block loading={submitting}>
        Criar conta
      </Button>

      <p className="text-center text-sm text-fg-muted">
        Já tem conta?{' '}
        <button type="button" onClick={onGoToLogin} className="font-semibold text-volt-300 hover:underline">
          Entrar
        </button>
      </p>
    </form>
  );
}
