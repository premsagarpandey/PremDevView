/**
 * security.ts
 * Implements client-side security measures to prevent basic tampering and inspection.
 */

export const initSecurity = () => {
  if (process.env.NODE_ENV === 'development') {
    // Optionally disable in development so you can actually work on it.
    // We'll leave it active for now to ensure it works, but usually you'd return here.
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
    if ((e.ctrlKey && e.shiftKey && e.key === 'I') || (e.metaKey && e.altKey && e.key === 'i')) {
      e.preventDefault();
    }
    // Ctrl+Shift+J (Windows) or Cmd+Option+J (Mac)
    if ((e.ctrlKey && e.shiftKey && e.key === 'J') || (e.metaKey && e.altKey && e.key === 'j')) {
      e.preventDefault();
    }
    // Ctrl+U (View Source) or Cmd+U
    if ((e.ctrlKey && e.key === 'U') || (e.metaKey && e.key === 'u')) {
      e.preventDefault();
    }
    // Ctrl+Shift+C (Inspect Element) or Cmd+Shift+C
    if ((e.ctrlKey && e.shiftKey && e.key === 'C') || (e.metaKey && e.shiftKey && e.key === 'c')) {
      e.preventDefault();
    }
    // Ctrl+S (Save Page) or Cmd+S
    if ((e.ctrlKey && e.key === 'S') || (e.metaKey && e.key === 's')) {
      e.preventDefault();
    }
    // Ctrl+P (Print Page) or Cmd+P
    if ((e.ctrlKey && e.key === 'P') || (e.metaKey && e.key === 'p')) {
      e.preventDefault();
    }
  });

  // 3. Debugger Trap (Anti-Debugging)
  // This will freeze the browser if Developer Tools is opened.
  const debuggerTrap = () => {
    try {
      // eslint-disable-next-line no-debugger
      debugger;
    } catch (err) {
      // Ignore
    }
  };

  // Run the trap in a loop
  setInterval(() => {
    debuggerTrap();
  }, 1000);

  // 4. Overwrite console.log to prevent information leakage (optional, but requested "heavy security")
  // Only override in production or if you want it always on
  const noop = () => {};
  if (process.env.NODE_ENV !== 'development') {
    console.log = noop;
    console.info = noop;
    console.warn = noop;
    console.error = noop;
  }
};
