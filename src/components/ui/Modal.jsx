import { useEffect, useId } from 'react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';

export default function Modal({ open, onClose, title, description, icon: Icon, tone = 'volt', children }) {
  const titleId = useId();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const iconTone = tone === 'danger' ? 'bg-rose-500/15 text-rose-300' : 'bg-volt-400/15 text-volt-300';

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink-950/70 p-4 backdrop-blur-sm sm:items-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="w-full max-w-md animate-fade-up rounded-3xl border border-white/10 bg-ink-850 p-6 shadow-2xl sm:p-8"
      >
        {Icon && (
          <div className={`mb-5 grid size-12 place-items-center rounded-2xl ${iconTone}`}>
            <Icon className="size-6" aria-hidden="true" />
          </div>
        )}
        <h3 id={titleId} className="text-xl font-bold">
          {title}
        </h3>
        {description && <p className="mt-2 text-sm text-fg-muted">{description}</p>}
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}
