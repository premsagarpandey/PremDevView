import './EmptyState.css';

interface EmptyStateProps {
  onFocusInput?: () => void;
}

export function EmptyState({ onFocusInput }: EmptyStateProps) {
  return (
    <div className="empty-state" onClick={onFocusInput} role="button" tabIndex={0}>
      <div className="empty-state-content">
        <h2 className="empty-state-message">
          Enter your localhost link
        </h2>
      </div>
    </div>
  );
}
