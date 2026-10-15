import { useId } from 'react';

const INPUT =
  'w-full rounded-2xl border bg-ink-900 px-4 py-3 text-sm text-fg placeholder:text-fg-subtle transition outline-none focus:border-volt-400/70 focus:ring-4 focus:ring-volt-400/10';

/** Label + input/textarea/select + error message, wired with aria attributes. */
export default function TextField({ label, error, hint, as = 'input', right, className = '', children, ...props }) {
  const id = useId();
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const Tag = as;
  const border = error ? 'border-rose-400/70' : 'border-white/10';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-sm font-medium text-fg">
        {label}
      </label>
      <div className="relative">
        <Tag
          id={id}
          className={`${INPUT} ${border} ${right ? 'pr-12' : ''} ${as === 'textarea' ? 'min-h-32 resize-y' : ''}`}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          {...props}
        >
          {children}
        </Tag>
        {right && <div className="absolute inset-y-0 right-2 flex items-center">{right}</div>}
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-xs font-medium text-rose-300" role="alert">
          {error}
        </p>
      ) : (
        hint && <p id={`${id}-hint`} className="text-xs text-fg-subtle">{hint}</p>
      )}
    </div>
  );
}
