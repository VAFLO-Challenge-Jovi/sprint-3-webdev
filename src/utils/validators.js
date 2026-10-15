const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isEmail = (value) => EMAIL_REGEX.test(String(value || '').trim());

/** 0 = too short, 1 = fraca, 2 = média, 3 = forte */
export function passwordStrength(password) {
  if (password.length < 6) return 0;
  let score = 1;
  if (password.length >= 8) score++;
  if (/[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) score++;
  return score;
}
