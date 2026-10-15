import { useCallback, useMemo } from 'react';
import { scansApi } from '../services/api/index.js';
import { useAuth } from './useAuth.js';
import { useAsync } from './useAsync.js';

/**
 * The logged user's scans (OCR texts and AI notes) from the API.
 * Mutations are optimistic: the UI updates first, then syncs.
 */
export function useScans() {
  const { user } = useAuth();
  const { data, setData, loading, error, reload } = useAsync(
    () => scansApi.listByUser(user.id),
    [user?.id],
    { initialData: [], enabled: Boolean(user) },
  );

  const scans = useMemo(
    () => [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [data],
  );

  const addScan = useCallback(
    async (scan) => {
      const tempId = `temp-${Date.now()}`;
      const draft = { ...scan, id: tempId, userId: String(user.id), createdAt: scan.createdAt || new Date().toISOString() };
      setData((current) => [draft, ...current]);
      try {
        const { id: _ignored, ...payload } = draft;
        const saved = await scansApi.create(payload);
        setData((current) => current.map((item) => (item.id === tempId ? saved : item)));
        return saved;
      } catch (err) {
        setData((current) => current.filter((item) => item.id !== tempId));
        throw err;
      }
    },
    [user, setData],
  );

  const removeScan = useCallback(
    async (id) => {
      const previous = data;
      setData((current) => current.filter((item) => item.id !== id));
      try {
        await scansApi.remove(id);
      } catch (err) {
        setData(previous);
        throw err;
      }
    },
    [data, setData],
  );

  const clearScans = useCallback(async () => {
    const previous = data;
    setData([]);
    try {
      await Promise.all(previous.map((scan) => scansApi.remove(scan.id)));
    } catch (err) {
      reload();
      throw err;
    }
  }, [data, setData, reload]);

  return { scans, loading, error, reload, addScan, removeScan, clearScans };
}
