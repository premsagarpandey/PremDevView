import { useState, useEffect } from 'react';
import './StatusBar.css';

interface StatusBarProps {
  displayUrl?: string;
  onClick?: () => void;
  onReload?: () => void;
  onHome?: () => void;
}

export function StatusBar({
  displayUrl = 'localhost:3000',
  onClick,
  onReload,
  onHome,
}: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="android-top-bar" aria-hidden="true">
      {/* Android System Status Bar */}
      <div className="status-bar">
        <span className="status-bar-time">{time}</span>

        <div className="status-bar-icons">
          {/* Signal */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 22h20V2z" />
          </svg>
          {/* Wi-Fi */}
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21L1 10C5 6 19 6 23 10L12 21Z" />
          </svg>
          {/* Battery */}
          <svg className="status-bar-battery" width="18" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="2" y="6" width="18" height="12" rx="3" fill="currentColor" />
            <path d="M22 10v4" />
          </svg>
        </div>
      </div>

      {/* Android Mobile Chrome Address Bar */}
      <div className="chrome-address-bar">
        {/* Home Button */}
        <button
          type="button"
          className="chrome-icon-btn"
          onClick={onHome}
          title="Go to Home"
          aria-label="Home"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </button>

        {/* URL Pill */}
        <div className="chrome-url-pill" onClick={onClick} role="button" tabIndex={0} title="Click to edit URL">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
          <span className="chrome-domain">{displayUrl}</span>
        </div>

        {/* Reload Button */}
        <button
          type="button"
          className="chrome-icon-btn"
          onClick={onReload}
          title="Reload preview"
          aria-label="Reload preview"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 2v6h-6" />
            <path d="M3 12a9 9 0 0 1 15.55-6.36L21 8" />
            <path d="M3 22v-6h6" />
            <path d="M21 12a9 9 0 0 1-15.55 6.36L3 16" />
          </svg>
        </button>

        {/* Tab Counter */}
        <div className="chrome-tab-counter" title="1 Open Tab">1</div>
      </div>
    </div>
  );
}
