import './EmptyState.css';

export function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">📱</div>
      <h2 className="empty-state-title">No Preview Yet</h2>
      <p className="empty-state-text">
        Enter your localhost URL above to get started.
      </p>
    </div>
  );
}
