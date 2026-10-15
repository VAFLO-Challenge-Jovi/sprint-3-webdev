export default function PhoneFrame({ src, alt, className = '' }) {
  return (
    <div className={`relative aspect-[9/19.5] rounded-[2.4rem] border border-white/15 bg-ink-950 p-2 shadow-2xl ${className}`}>
      <div className="absolute top-3.5 left-1/2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink-950" aria-hidden="true" />
      <img src={src} alt={alt} className="size-full rounded-[1.9rem] object-cover object-top" loading="lazy" />
    </div>
  );
}
