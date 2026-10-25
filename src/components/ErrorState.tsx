import type { ErrorType } from '../hooks/usePreview';
import './ErrorState.css';

interface ErrorStateProps {
  type: ErrorType;
  message?: string;
  onRetry?: () => void;
}

const ERROR_CONFIG: Record<ErrorType, { title: string; description: string; tip?: string }> = {
  'invalid-url': {
    title: 'Invalid URL Format',
    description: 'Please enter a valid localhost address, port number, or web URL.',
    tip: 'Example: localhost:5173 or :3000',
  },
  'connection': {
    title: "Cannot Connect to Local Server",
    description: 'Ensure your local development server is running in the background.',
    tip: 'Terminal: npm run dev or VS Code Live Server',
  },
  'iframe-blocked': {
    title: "Embedding Restricted by Target Site",
    description: "This website's security policy (X-Frame-Options or CSP) prevents embedded previews.",
    tip: 'Localhost servers and un-deployed projects have no restrictions.',
  },
  'unknown': {
    title: 'Preview Error',
    description: 'An unexpected issue occurred while loading this page.',
    tip: 'Check that your local port is active and try again.',
  },
};

export function ErrorState({ type, message, onRetry }: ErrorStateProps) {
  const config = ERROR_CONFIG[type] || ERROR_CONFIG['unknown'];

  return (
    <div className="error-state">
      <div className="error-state-badge">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      </div>

      <h2 className="error-state-title">{config.title}</h2>
      <p className="error-state-description">
        {message || config.description}
      </p>

      {config.tip && (
        <div className="error-state-tip">
          <span className="error-tip-label">Tip:</span>
          <code>{config.tip}</code>
        </div>
      )}

      {onRetry && (
        <button type="button" className="error-retry-btn" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
