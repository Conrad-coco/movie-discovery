import { useState, useEffect } from 'react';
import { tmdb } from '../api/tmdb.js';

// Loads data from TMDB whenever path/params change.
export default function useFetch(path, params = {}) {
  const [state, setState] = useState({ data: null, loading: !!path, error: null });
  const key = path + JSON.stringify(params);

  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    tmdb(path, params, controller.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ data: null, loading: false, error: err.message });
      });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
