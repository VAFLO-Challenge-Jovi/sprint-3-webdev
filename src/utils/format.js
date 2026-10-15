export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncate(str, max = 60) {
  const text = String(str || '');
  return text.length > max ? text.slice(0, max).trimEnd() + '…' : text;
}

/** Lowercase + strip accents, for keyword matching. */
export function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Rounds elapsed time since `dateStr` into a friendly "X min atrás" / "há X dias" label
 * (Math.round / Math.floor — carried over from Sprint 3).
 */
export function relativeTime(dateStr) {
  const diffMinutes = Math.round((Date.now() - new Date(dateStr).getTime()) / 60000);

  if (diffMinutes < 1) return 'agora mesmo';
  if (diffMinutes < 60) return `${diffMinutes} min atrás`;

  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;

  const diffDays = Math.floor(diffHours / 24);
  return `há ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
}

export function initials(name) {
  return String(name || '?')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}
