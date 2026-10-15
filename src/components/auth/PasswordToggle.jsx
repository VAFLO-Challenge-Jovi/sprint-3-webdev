import { Eye, EyeOff } from 'lucide-react';

export default function PasswordToggle({ visible, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="grid size-9 place-items-center rounded-xl text-fg-subtle hover:bg-white/6 hover:text-fg"
      aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
    >
      {visible ? <EyeOff className="size-4" aria-hidden="true" /> : <Eye className="size-4" aria-hidden="true" />}
    </button>
  );
}
