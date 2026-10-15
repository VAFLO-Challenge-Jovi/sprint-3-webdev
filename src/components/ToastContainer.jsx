import { CircleAlert, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import { useToastState } from '../hooks/useToast.js';

const STYLES = {
  success: { icon: CircleCheck, className: 'text-volt-300' },
  error: { icon: CircleAlert, className: 'text-rose-300' },
  warning: { icon: TriangleAlert, className: 'text-amber-300' },
  info: { icon: Info, className: 'text-iris-300' },
};

export default function ToastContainer() {
  const { toasts, handleToastClick } = useToastState();

  return (
    <div className="pointer-events-none fixed inset-x-4 top-4 z-[60] flex flex-col items-center gap-2 sm:inset-x-auto sm:top-20 sm:right-6 sm:items-end" aria-live="polite">
      {toasts.map((toast) => {
        const { icon: Icon, className } = STYLES[toast.type] || STYLES.info;
        return (
          <button
            key={toast.id}
            type="button"
            role="status"
            onClick={() => handleToastClick(toast.id)}
            className={`pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-ink-800/95 px-4 py-3 text-left text-sm shadow-xl backdrop-blur ${
              toast.removing ? 'animate-toast-out' : 'animate-toast-in'
            }`}
          >
            <Icon className={`size-5 shrink-0 ${className}`} aria-hidden="true" />
            <span className="text-fg">{toast.message}</span>
          </button>
        );
      })}
    </div>
  );
}
