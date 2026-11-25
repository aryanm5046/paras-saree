import { useEffect, useState } from 'react';

export default function useApi(path) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const response = await fetch(path, { signal: controller.signal });
        const data = response.ok ? await response.json() : null;
        if (!controller.signal.aborted) {
          setResult({ path, attempt, status: response.status, data });
        }
      } catch {
        if (!controller.signal.aborted) {
          setResult({ path, attempt, status: 0, data: null });
        }
      }
    }

    load();
    return () => controller.abort();
  }, [path, attempt]);

  const current = result?.path === path && result?.attempt === attempt ? result : null;

  return {
    loading: current === null,
    status: current?.status,
    data: current?.data,
    previousData: result?.data,
    retry: () => setAttempt((value) => value + 1),
  };
}
