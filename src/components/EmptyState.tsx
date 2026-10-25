import './EmptyState.css';

interface EmptyStateProps {
  onFocusInput?: () => void;
}

export function EmptyState({ onFocusInput }: EmptyStateProps) {
  return (
    <div
      className="empty-state"
      onClick={onFocusInput}
      role="button"
      tabIndex={0}
      title="Click to enter URL"
    >
      <div className="empty-state-content">
        <div className="empty-state-icon-glow">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
        </div>

        <h2 className="empty-state-title">Ready for Preview</h2>
        <p className="empty-state-subtitle">
          Type your localhost URL or pick a port above to test your web app live.
        </p>

        <span className="empty-state-action-tag">
          Tap to enter URL
        </span>
      </div>
    </div>
  );
}
