import { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js';
import Button from './Button.jsx';

/** Right-side panel (bottom sheet on mobile) used by the AI drawers. */
export default function Drawer({ open, onClose, eyebrow, title, children, footer }) {
  const titleId = useId();
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 transition-[visibility] duration-300 ${open ? 'visible' : 'pointer-events-none invisible'}`}
      aria-hidden={!open}
    >
      <div
        className={`absolute inset-0 bg-ink-950/60 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        inert={!open}
        className={`absolute inset-x-0 bottom-0 flex max-h-[88dvh] flex-col rounded-t-4xl border border-white/10 bg-ink-900 shadow-2xl transition-transform duration-300 ease-out md:inset-y-3 md:right-3 md:left-auto md:max-h-none md:w-[440px] md:rounded-4xl ${
          open ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-[110%] md:translate-y-0'
        }`}
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/8 p-5">
          <div>
            {eyebrow && <p className="text-xs font-semibold tracking-widest text-iris-300 uppercase">{eyebrow}</p>}
            <h2 id={titleId} className="mt-1 text-xl font-bold">
              {title}
            </h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar painel">
            <X className="size-5" aria-hidden="true" />
          </Button>
        </header>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">{children}</div>
        {footer && <footer className="border-t border-white/8 p-5">{footer}</footer>}
      </aside>
    </div>
  );
}
