import { useEffect, useCallback } from 'react';

interface ShortcutHandlers {
  onBack: () => void;
  onForward: () => void;
  onReload: () => void;

  onRotate: () => void;
  onFullscreen: () => void;
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

      // Alt + Left: Back
      if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        handlers.onBack();
        return;
      }

      // Alt + Right: Forward
      if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        handlers.onForward();
        return;
      }

      // Ctrl + R: Reload preview (prevent browser reload)
      if (e.ctrlKey && e.key === 'r') {
        e.preventDefault();
        handlers.onReload();
        return;
      }

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
        case 'f':
        case 'F':
          e.preventDefault();
          handlers.onFullscreen();
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
