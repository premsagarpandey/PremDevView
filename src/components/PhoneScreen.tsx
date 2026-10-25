import { useEffect, useRef, useState } from 'react';
import type { PreviewStatus, ErrorType } from '../hooks/usePreview';
import { EmptyState } from './EmptyState';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { StatusBar } from './StatusBar';
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
  displayUrl: string;
  onAddressBarClick?: () => void;
  onReload?: () => void;
  onHome?: () => void;
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
  displayUrl,
  onAddressBarClick,
  onReload,
  onHome,
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
          setScale(Math.min(visualWidth / width, 1));
        }
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={containerRef} className="phone-screen">
      {status === 'idle' && (
        <div className="phone-screen-idle-layout">
          <StatusBar
            displayUrl="localhost:3000"
            onClick={onAddressBarClick}
            onReload={onReload}
            onHome={onHome}
          />
          <EmptyState onFocusInput={onAddressBarClick} />
        </div>
      )}

      {status === 'error' && errorType && (
        <ErrorState type={errorType} message={errorMessage} />
      )}

      {status === 'loading' && (
        <div className="phone-screen-loading-overlay">
          <LoadingState />
        </div>
      )}

      {showIframe && currentUrl && (
        <div
          className="phone-screen-scaled-wrapper"
          style={{
            width: `${width}px`,
            height: `${height}px`,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            opacity: status === 'loaded' ? 1 : 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <StatusBar
            displayUrl={displayUrl}
            onClick={onAddressBarClick}
            onReload={onReload}
            onHome={onHome}
          />

          <div className="phone-screen-iframe-container">
            <iframe
              ref={iframeRef}
              className="phone-screen-iframe"
              src={currentUrl}
              title="PremDevView Device Preview"
              onLoad={onLoad}
              onError={onError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-downloads"
              allow="accelerometer; autoplay; camera; encrypted-media; geolocation; gyroscope; microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
}
