import { useEffect, useRef, useState } from 'react';
import type { PreviewStatus, ErrorType } from '../hooks/usePreview';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import './PhoneScreen.css';

interface PhoneScreenProps {
  status: PreviewStatus;
  currentUrl: string;
  errorType: ErrorType | null;
  errorMessage: string;
  width: number;
  height: number;
  iframeRef: React.RefObject<HTMLIFrameElement | null>;
  onLoad: () => void;
  onError: () => void;
}

export function PhoneScreen({
  status,
  currentUrl,
  errorType,
  errorMessage,
  width,
  height,
  iframeRef,
  onLoad,
  onError,
}: PhoneScreenProps) {
  const showIframe = status === 'loading' || status === 'loaded';
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const visualWidth = entry.contentRect.width;
        if (visualWidth > 0 && width > 0) {
          setScale(visualWidth / width);
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div
      ref={containerRef}
      className="phone-screen"
    >
      {status === 'idle' && <EmptyState />}

      {status === 'error' && errorType && (
        <ErrorState type={errorType} message={errorMessage} />
      )}

      {status === 'loading' && (
        <div className="phone-screen-loading-overlay">
          <LoadingState />
        </div>
      )}

      {showIframe && currentUrl && (
        <iframe
          ref={iframeRef}
          className="phone-screen-iframe"
          src={currentUrl}
          title="Website Preview"
          onLoad={onLoad}
          onError={onError}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox"
          allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
          style={{
            // Add 18px to hide the native desktop scrollbar outside the overflow: hidden container
            width: `${width + 18}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            opacity: status === 'loaded' ? 1 : 0,
          }}
        />
      )}
    </div>
  );
}
