/** Four lime corner brackets — the SeekVision visual signature. */
export default function ScanFrame({ className = 'inset-4', thickness = 'border-[3px]', size = 'size-8' }) {
  const corner = `absolute ${size} ${thickness} border-volt-400`;
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <span className={`${corner} top-0 left-0 rounded-tl-2xl border-r-0 border-b-0`} />
      <span className={`${corner} top-0 right-0 rounded-tr-2xl border-b-0 border-l-0`} />
      <span className={`${corner} bottom-0 left-0 rounded-bl-2xl border-t-0 border-r-0`} />
      <span className={`${corner} right-0 bottom-0 rounded-br-2xl border-t-0 border-l-0`} />
    </div>
  );
}
