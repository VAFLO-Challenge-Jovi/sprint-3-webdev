/** Only internal paths are accepted as redirect targets (no open redirects). */
export function safeRedirect(value) {
  return value && value.startsWith('/') && !value.startsWith('//') ? value : '/app';
}
