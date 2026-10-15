/**
 * Offline adapter with the same interface as the MockAPI adapter.
 * Data lives in localStorage and every call has a random latency, so the
 * UI exercises the same loading/error states it has with the real API.
 */
const PREFIX = 'seekvision_api_';

function read(resource) {
  try {
    return JSON.parse(localStorage.getItem(PREFIX + resource) || '[]');
  } catch {
    return [];
  }
}

function write(resource, rows) {
  localStorage.setItem(PREFIX + resource, JSON.stringify(rows));
}

function latency() {
  return new Promise((resolve) => setTimeout(resolve, 250 + Math.round(Math.random() * 450)));
}

export function createLocalAdapter(seed = {}) {
  Object.entries(seed).forEach(([resource, rows]) => {
    if (localStorage.getItem(PREFIX + resource) === null) write(resource, rows);
  });

  return {
    async list(resource, params = {}) {
      await latency();
      return read(resource).filter((row) =>
        Object.entries(params).every(([key, value]) => String(row[key]) === String(value)),
      );
    },
    async create(resource, data) {
      await latency();
      const rows = read(resource);
      const nextId = rows.reduce((max, row) => Math.max(max, Number(row.id) || 0), 0) + 1;
      const row = { ...data, id: String(nextId) };
      write(resource, [...rows, row]);
      return row;
    },
    async update(resource, id, data) {
      await latency();
      const rows = read(resource).map((row) => (row.id === id ? { ...row, ...data } : row));
      write(resource, rows);
      return rows.find((row) => row.id === id);
    },
    async remove(resource, id) {
      await latency();
      const rows = read(resource);
      write(resource, rows.filter((row) => row.id !== id));
      return rows.find((row) => row.id === id);
    },
  };
}
