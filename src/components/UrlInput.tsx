import { useState, useEffect, type FormEvent } from 'react';
import './UrlInput.css';

interface UrlInputProps {
  defaultUrl: string;
  onSubmit: (url: string) => void;
}

const COMMON_PORTS = ['3000', '5173', '5500', '8080', '8000'];

export function UrlInput({ defaultUrl, onSubmit }: UrlInputProps) {
  const [url, setUrl] = useState(defaultUrl || '');

  useEffect(() => {
    setUrl(defaultUrl || '');
  }, [defaultUrl]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit(url.trim());
    }
  };

  const handlePortClick = (port: string) => {
    const formatted = `http://localhost:${port}`;
    setUrl(formatted);
    onSubmit(formatted);
  };

  const handleClear = () => {
    setUrl('');
    const inputEl = document.getElementById('url-input');
    inputEl?.focus();
  };

  return (
    <form className="url-input-form" onSubmit={handleSubmit} role="search">
      <div className="url-input-header">
        <label htmlFor="url-input" className="url-input-label">
          Localhost or Website URL
        </label>
        <span className="url-input-hint">Press Enter ↵</span>
      </div>

      <div className="url-input-group">
        <div className="url-input-wrapper">
          <span className="url-input-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          </span>

          <input
            id="url-input"
            type="text"
            className="url-input-field"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="e.g. localhost:5173 or port 3000"
            autoComplete="off"
            spellCheck={false}
            aria-label="Enter localhost or website URL"
          />

          {url && (
            <button
              type="button"
              className="url-input-clear-btn"
              onClick={handleClear}
              aria-label="Clear input"
              title="Clear input"
            >
              ✕
            </button>
          )}
        </div>

        <button type="submit" className="url-input-submit" aria-label="Open Mobile Preview">
          <span>Preview</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Quick Launch Port Chips */}
      <div className="url-port-chips">
        <span className="port-chips-label">Quick:</span>
        {COMMON_PORTS.map((port) => (
          <button
            key={port}
            type="button"
            className="port-chip-btn"
            onClick={() => handlePortClick(port)}
            title={`Preview http://localhost:${port}`}
          >
            :{port}
          </button>
        ))}
      </div>
    </form>
  );
}
