import './LoadingState.css';

export function LoadingState() {
  return (
    <div className="loading-state">
      <div className="loading-state-spinner" />
      <p className="loading-state-text">Loading your website…</p>
    </div>
  );
}
