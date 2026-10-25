import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Developer console signature
if (typeof window !== 'undefined' && !import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log(
    '%c PremDevView %c v1.0.0 %c\n%c Crafted with precision by Prem Sagar Pandey %c\n https://prem-dev-view.vercel.app ',
    'background:#06b6d4;color:#09090b;font-weight:800;border-radius:4px 0 0 4px;padding:3px 7px;font-size:12px;',
    'background:#1e1e30;color:#f0f0f8;font-weight:600;border-radius:0 4px 4px 0;padding:3px 7px;font-size:12px;',
    '',
    'color:#8888a4;font-size:11px;line-height:1.8;',
    ''
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
