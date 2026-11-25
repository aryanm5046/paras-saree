import React, { createContext, useContext, useEffect, useState } from 'react';

const ShortlistContext = createContext(null);
const storageKey = 'paras-sarees-shortlist';
export const maximumQuantity = 9999;

function readShortlist() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(storageKey) ?? '[]');
    if (!Array.isArray(stored)) return [];

    const seen = new Set();
    return stored.filter((item) => {
      if (typeof item?.id !== 'string' || !/^[a-z0-9-]+$/.test(item.id) || seen.has(item.id)) return false;
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > maximumQuantity) return false;
      seen.add(item.id);
      return true;
    });
  } catch {
    return [];
  }
}

export function ShortlistProvider({ children }) {
  const [items, setItems] = useState(readShortlist);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(items));
    } catch {
      // The shortlist stays usable for this visit when browser storage is unavailable.
    }
  }, [items]);

  function save(id) {
    setItems((current) => current.some((item) => item.id === id) ? current : [...current, { id, quantity: 1 }]);
  }

  function remove(id) {
    setItems((current) => current.filter((item) => item.id !== id));
  }

  function setQuantity(id, quantity) {
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > maximumQuantity) return;
    setItems((current) => current.map((item) => item.id === id ? { id, quantity } : item));
  }

  return (
    <ShortlistContext.Provider value={{ items, save, remove, setQuantity }}>
      {children}
    </ShortlistContext.Provider>
  );
}

export function useShortlist() {
  return useContext(ShortlistContext);
}
