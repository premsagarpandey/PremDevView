import { useState, useEffect } from 'react';
import './StatusBar.css';

interface StatusBarProps {
  displayUrl?: string;
  onClick?: () => void;
}

export function StatusBar({ displayUrl = 'localhost', onClick }: StatusBarProps) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
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
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 22h20V2z" />
          </svg>
          {/* Wi-Fi */}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21L1 10C5 6 19 6 23 10L12 21Z" />
          </svg>
          {/* Battery */}
          <svg className="status-bar-battery" width="20" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="2" y="6" width="18" height="12" rx="3" fill="currentColor" />
            <path d="M22 10v4" />
          </svg>
        </div>
      </div>
      
      {/* Android Chrome Address Bar */}
      <div className="chrome-address-bar">
        {/* Home Button */}
        <button className="chrome-icon-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </button>

        {/* URL Pill */}
        <div className="chrome-url-pill" onClick={onClick}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <span className="chrome-domain">{displayUrl}</span>
        </div>

        {/* Tab Counter & Menu */}
        <div className="chrome-right-actions">
          <div className="chrome-tab-counter">1</div>
          <button className="chrome-icon-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
