import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Runs an async loader on mount (and when `deps` change) and exposes
 * { data, setData, loading, error, reload }. Stale responses are ignored.
 */
export function useAsync(loader, deps = [], { initialData = null, enabled = true } = {}) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState(null);
  const loaderRef = useRef(loader);
  const runIdRef = useRef(0);

  useEffect(() => {
    loaderRef.current = loader;
  });

  const reload = useCallback(async () => {
    const runId = ++runIdRef.current;
    setLoading(true);
    setError(null);
    try {
      const result = await loaderRef.current();
      if (runId === runIdRef.current) setData(result);
    } catch (err) {
      if (runId === runIdRef.current) setError(err);
    } finally {
      if (runId === runIdRef.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (enabled) reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reload, ...deps]);

  return { data, setData, loading, error, reload };
}
