import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onRotate: () => void;
}

/**
 * Registers keyboard shortcuts for PremDevView.
 * Shortcuts are disabled when an input/textarea is focused.
 */
export function useKeyboardShortcuts(handlers: ShortcutHandlers): void {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.tagName === 'SELECT' ||
        target.isContentEditable;

      // Skip single-key shortcuts when in input fields
      if (isInput) return;

      switch (e.key) {
        case 'r':
        case 'R':
          if (!e.ctrlKey) {
            e.preventDefault();
            handlers.onRotate();
          }
          break;
      }
    },
    [handlers]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
