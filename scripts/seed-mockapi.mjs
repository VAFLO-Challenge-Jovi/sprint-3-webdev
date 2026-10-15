/**
 * Seeds the MockAPI project with the test user and a few sample scans.
 * Usage: VITE_MOCKAPI_URL=https://<id>.mockapi.io/api/v1 npm run seed
 *        (or put VITE_MOCKAPI_URL in .env)
 */
import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';

function readEnvFile() {
  if (!existsSync('.env')) return {};
  return Object.fromEntries(
    readFileSync('.env', 'utf8')
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]),
  );
}

const BASE = (process.env.VITE_MOCKAPI_URL || readEnvFile().VITE_MOCKAPI_URL || '').replace(/\/$/, '');
if (!BASE) {
  console.error('Defina VITE_MOCKAPI_URL (no .env ou na linha de comando).');
  process.exit(1);
}

async function call(path, options = {}) {
  const res = await fetch(`${BASE}/${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 404 && !options.method) return [];
  if (!res.ok) throw new Error(`${options.method || 'GET'} /${path} → ${res.status}`);
  return res.json();
}

const email = 'aluno@seekvision.com';
const existing = (await call(`users?email=${encodeURIComponent(email)}`)).find((u) => u.email === email);

const user =
  existing ||
  (await call('users', {
    method: 'POST',
    body: JSON.stringify({
      name: 'Aluno Teste',
      email,
      passwordHash: createHash('sha256').update('seek1234').digest('hex'),
      createdAt: new Date().toISOString(),
    }),
  }));
console.log(existing ? '✓ Usuário de teste já existe' : '✓ Usuário de teste criado', `(id ${user.id})`);

const scans = await call(`scans?userId=${user.id}`);
if (scans.length === 0) {
  const now = Date.now();
  const samples = [
    { kind: 'ocr', text: 'The Photography Storytelling Workshop', category: 'Livros', daysAgo: 0 },
    { kind: 'ocr', text: 'Teorema de Pitágoras: a² + b² = c²', category: 'Estudos', daysAgo: 2 },
    {
      kind: 'analysis',
      text: 'Fotossíntese',
      title: 'Fotossíntese',
      category: 'Estudos',
      summary: 'Processo pelo qual plantas, algas e algumas bactérias convertem luz em energia química.',
      keyPoints: ['Ocorre nos cloroplastos', 'Produz glicose e oxigênio', 'Depende de luz, água e CO₂'],
      sources: [{ title: 'Wikipédia — Fotossíntese', url: 'https://pt.wikipedia.org/wiki/Fotoss%C3%ADntese' }],
      daysAgo: 4,
    },
  ];
  for (const { daysAgo, ...scan } of samples) {
    await call('scans', {
      method: 'POST',
      body: JSON.stringify({
        ...scan,
        userId: String(user.id),
        createdAt: new Date(now - daysAgo * 86400000).toISOString(),
      }),
    });
  }
  console.log(`✓ ${samples.length} scans de exemplo criados`);
} else {
  console.log(`✓ Usuário já possui ${scans.length} scans`);
}
