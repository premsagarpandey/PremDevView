import { useState, useCallback } from 'react';

/**
 * Generic localStorage hook for persisting simple preferences.
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  const storageKey = `premdevview_${key}`;

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(storageKey);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      setStoredValue(value);
      try {
        localStorage.setItem(storageKey, JSON.stringify(value));
      } catch {
        // localStorage unavailable — silently ignore
      }
    },
    [storageKey]
  );

  return [storedValue, setValue];
}

/**
 * Clears all PremDevView preferences from localStorage.
 */
export function clearAllPreferences(): void {
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith('premdevview_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Silently ignore
  }
}
