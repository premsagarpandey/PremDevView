import './EmptyState.css';

interface EmptyStateProps {
  onFocusInput?: () => void;
}

export function EmptyState({ onFocusInput }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <div className="empty-state-card">
        <div className="empty-state-badge">
          <span className="empty-state-dot"></span>
          Ready to Preview
        </div>

        <div className="empty-state-icon-wrap">
          <img src="/logo.png" alt="PremDevView Logo" className="empty-state-icon" />
          <div className="empty-state-icon-glow"></div>
        </div>

        <h2 className="empty-state-title">
          Please enter your localhost link in the link tab
        </h2>

        <p className="empty-state-text">
          Enter your local server URL (e.g. <code>localhost:5173</code>, <code>localhost:3000</code>, or <code>127.0.0.1:5500</code>) in the top-right box and click <strong>Open Mobile Preview</strong>.
        </p>

        <div className="empty-state-examples">
          <span className="empty-example-tag">5173 (Vite)</span>
          <span className="empty-example-tag">3000 (React/Next)</span>
          <span className="empty-example-tag">5500 (Live Server)</span>
        </div>

        {onFocusInput && (
          <button 
            type="button" 
            className="empty-state-action-btn"
            onClick={onFocusInput}
          >
            <span>Enter Link Above</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7"></path>
              <path d="M7 7h10v10"></path>
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
