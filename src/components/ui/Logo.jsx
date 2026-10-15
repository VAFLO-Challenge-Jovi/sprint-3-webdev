import { Link } from 'react-router-dom';

export function LogoMark({ className = 'size-8' }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" className="fill-ink-800" />
      <path
        d="M14 24v-6a4 4 0 0 1 4-4h6M40 14h6a4 4 0 0 1 4 4v6M50 40v6a4 4 0 0 1-4 4h-6M24 50h-6a4 4 0 0 1-4-4v-6"
        className="stroke-volt-400"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <circle cx="32" cy="32" r="8" className="fill-iris-500" />
    </svg>
  );
}

export default function Logo({ to = '/', className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`} aria-label="SeekVision — início">
      <LogoMark />
      <span>
        Seek<span className="text-volt-400">Vision</span>
      </span>
    </Link>
  );
}
