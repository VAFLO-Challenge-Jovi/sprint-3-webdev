import { createHttpAdapter } from './httpAdapter.js';
import { createLocalAdapter } from './localAdapter.js';
import { TEST_USER_SEED } from './seed.js';

const BASE_URL = (import.meta.env.VITE_MOCKAPI_URL || '').trim().replace(/\/$/, '');

export const API_MODE = BASE_URL ? 'mockapi' : 'local';

const db = BASE_URL ? createHttpAdapter(BASE_URL) : createLocalAdapter({ users: [TEST_USER_SEED] });
const offline = createLocalAdapter();

export const usersApi = {
  async findByEmail(email) {
    const rows = await db.list('users', { email });
    return rows.find((user) => user.email.toLowerCase() === email.toLowerCase()) || null;
  },
  create: (user) => db.create('users', user),
};

export const scansApi = {
  async listByUser(userId, signal) {
    const rows = await db.list('scans', { userId }, signal);
    return rows.filter((scan) => String(scan.userId) === String(userId));
  },
  create: (scan) => db.create('scans', scan),
  remove: (id) => db.remove('scans', id),
};

export const messagesApi = {
  /** Contact form. Falls back to a local outbox if the resource is unavailable. */
  async send(message) {
    try {
      return { ...(await db.create('messages', message)), stored: API_MODE };
    } catch {
      return { ...(await offline.create('messages_outbox', message)), stored: 'local' };
    }
  },
};
