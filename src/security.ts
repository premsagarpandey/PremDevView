/**
 * security.ts
 * Implements heavy client-side security measures to prevent tampering, inspection, and reverse engineering.
 */

export const initSecurity = () => {
  // Use Vite's environment variables
  if (import.meta.env.DEV) {
    // Optionally disable in development so you can actually work on it.
    // Uncomment the return below to disable security while developing.
    // return; 
  }

  // 1. Disable Right-Click (Context Menu)
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
  });

  // 2. Disable Keyboard Shortcuts (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, etc.)
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I (Windows) or Cmd+Option+I (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'i') || (e.metaKey && e.altKey && e.key.toLowerCase() === 'i')) {
      e.preventDefault();
    }
    // Ctrl+Shift+J (Windows) or Cmd+Option+J (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'j') || (e.metaKey && e.altKey && e.key.toLowerCase() === 'j')) {
      e.preventDefault();
    }
    // Ctrl+U (View Source) or Cmd+U
    if ((e.ctrlKey && e.key.toLowerCase() === 'u') || (e.metaKey && e.key.toLowerCase() === 'u')) {
      e.preventDefault();
    }
    // Ctrl+Shift+C (Inspect Element) or Cmd+Shift+C
    if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') || (e.metaKey && e.shiftKey && e.key.toLowerCase() === 'c')) {
      e.preventDefault();
    }
    // Ctrl+S (Save Page) or Cmd+S
    if ((e.ctrlKey && e.key.toLowerCase() === 's') || (e.metaKey && e.key.toLowerCase() === 's')) {
      e.preventDefault();
    }
    // Ctrl+P (Print Page) or Cmd+P
    if ((e.ctrlKey && e.key.toLowerCase() === 'p') || (e.metaKey && e.key.toLowerCase() === 'p')) {
      e.preventDefault();
    }
  });

  // 3. Heavy Debugger Trap (Anti-Debugging)
  // This will freeze the browser if Developer Tools is opened.
  const debuggerTrap = () => {
    try {
      (function() {
        return false;
      })
      ['constructor']('debugger')
      ['call']();
    } catch (err) {
      // Ignore
    }
  };

  // Run the trap in a fast loop to heavily penalize devtools open state
  setInterval(() => {
    debuggerTrap();
  }, 100); // 100ms for aggressive anti-debugging

  // 4. Overwrite console to prevent information leakage and tampering
  const noop = () => {};
  if (!import.meta.env.DEV) {
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
    console.debug = noop;
    console.trace = noop;
    console.dir = noop;
    console.dirxml = noop;
    console.group = noop;
    console.groupCollapsed = noop;
    console.groupEnd = noop;
    console.time = noop;
    console.timeEnd = noop;
    console.timeLog = noop;
    console.profile = noop;
    console.profileEnd = noop;
    console.count = noop;
    console.countReset = noop;
    console.table = noop;
    console.clear = noop;
  }

  // 5. Aggressive Console Wiping (wipes any devtools output repeatedly)
  if (!import.meta.env.DEV) {
    setInterval(() => {
      // eslint-disable-next-line no-console
      console.clear();
    }, 1000);
  }
};
