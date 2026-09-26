"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "klipvo:saved-deal-ids";

interface SavedDealsContextValue {
  savedIds: number[];
  isSaved: (id: number) => boolean;
  toggleSave: (id: number) => void;
}

const SavedDealsContext = createContext<SavedDealsContextValue | null>(null);

export function SavedDealsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<number[]>([1, 3]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // One-time hydration from localStorage on mount — not derivable from props/state, so an effect is correct here.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setSavedIds(JSON.parse(raw));
    } catch {
      // localStorage unavailable (private mode, etc.) — keep defaults
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // ignore write failures
    }
  }, [savedIds, hydrated]);

  const toggleSave = useCallback((id: number) => {
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const isSaved = useCallback(
    (id: number) => savedIds.includes(id),
    [savedIds]
  );

  const value = useMemo(
    () => ({ savedIds, isSaved, toggleSave }),
    [savedIds, isSaved, toggleSave]
  );

  return (
    <SavedDealsContext.Provider value={value}>
      {children}
    </SavedDealsContext.Provider>
  );
}

export function useSavedDeals() {
  const ctx = useContext(SavedDealsContext);
  if (!ctx) {
    throw new Error("useSavedDeals must be used within a SavedDealsProvider");
  }
  return ctx;
}
