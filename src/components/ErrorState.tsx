import type { ErrorType } from '../hooks/usePreview';
import './ErrorState.css';

interface ErrorStateProps {
  type: ErrorType;
  message?: string;
}

const ERROR_CONFIG: Record<ErrorType, { icon: string; title: string; description: string; tip?: string }> = {
  'invalid-url': {
    icon: '⚠️',
    title: 'Invalid URL',
    description: 'Please enter a valid localhost or web URL.',
    tip: 'Example: http://localhost:5173',
  },
  'connection': {
    icon: '🔌',
    title: "Can't reach this website",
    description: 'Make sure your local development server is running.',
    tip: 'Try running: npm run dev',
  },
  'iframe-blocked': {
    icon: '🔒',
    title: "This website can't be embedded",
    description: "The website's security policy prevents iframe previews.",
    tip: 'A future PremDevView Extension may provide deeper integration.',
  },
  'unknown': {
    icon: '❌',
    title: 'Something went wrong',
    description: 'Try reloading the preview.',
  },
};

export function ErrorState({ type, message }: ErrorStateProps) {
  const config = ERROR_CONFIG[type] || ERROR_CONFIG['unknown'];

  return (
    <div className="error-state">
      <div className="error-state-icon">{config.icon}</div>
      <h2 className="error-state-title">{config.title}</h2>
      <p className="error-state-description">
        {message || config.description}
      </p>
      {config.tip && (
        <p className="error-state-tip">
          <code>{config.tip}</code>
        </p>
      )}
    </div>
  );
}
