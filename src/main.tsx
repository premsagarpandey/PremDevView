import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Ensure fresh start on every page load/refresh by removing any legacy stored session state
try {
  localStorage.removeItem('premdevview_lastUrl');
  localStorage.removeItem('premdevview_landscape');
} catch {
  // Ignore
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
