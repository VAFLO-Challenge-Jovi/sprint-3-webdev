const BASE =
  'inline-flex cursor-pointer select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-45';

const VARIANTS = {
  primary:
    'bg-volt-400 text-ink-950 shadow-[0_10px_30px_-10px_var(--color-volt-400)] hover:bg-volt-300',
  iris: 'bg-iris-500 text-white shadow-[0_10px_30px_-10px_var(--color-iris-500)] hover:bg-iris-600',
  secondary: 'bg-white/6 text-fg ring-1 ring-white/12 ring-inset hover:bg-white/10',
  ghost: 'text-fg-muted hover:bg-white/6 hover:text-fg',
  danger: 'bg-rose-500 text-white hover:bg-rose-400',
  // for use on the lime CTA banner
  dark: 'bg-ink-950 text-fg hover:bg-ink-800',
  'outline-dark': 'text-ink-950 ring-2 ring-ink-950/80 ring-inset hover:bg-ink-950/10',
};

const SIZES = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
  icon: 'size-10',
};

export function buttonClasses({ variant = 'primary', size = 'md', block = false, className = '' } = {}) {
  return [BASE, VARIANTS[variant], SIZES[size], block ? 'w-full' : '', className].filter(Boolean).join(' ');
}

