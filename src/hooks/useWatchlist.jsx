import { createContext, useContext, useEffect, useState } from 'react';

const KEY = 'cinescope-watchlist';
const Ctx = createContext(null);

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(items)); }, [items]);

  const has = (id, type) => items.some((i) => i.id === id && i.type === type);
  const toggle = (item) =>
    setItems((prev) =>
      prev.some((i) => i.id === item.id && i.type === item.type)
        ? prev.filter((i) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    );

  return <Ctx.Provider value={{ items, has, toggle }}>{children}</Ctx.Provider>;
}

export const useWatchlist = () => useContext(Ctx);
