import { passwordStrength } from '../../utils/validators.js';

const LABELS = ['', 'Fraca', 'Média', 'Forte'];
const COLORS = ['', 'bg-rose-400', 'bg-amber-300', 'bg-volt-400'];

export default function PasswordStrength({ password }) {
  if (!password) return null;
  const strength = passwordStrength(password);
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="grid flex-1 grid-cols-3 gap-1.5" aria-hidden="true">
        {[1, 2, 3].map((bar) => (
          <span key={bar} className={`h-1.5 rounded-full ${bar <= strength ? COLORS[strength] : 'bg-white/10'}`} />
        ))}
      </div>
      <span className="w-24 text-right text-xs text-fg-muted">{strength ? `Senha ${LABELS[strength].toLowerCase()}` : 'Muito curta'}</span>
    </div>
  );
}
