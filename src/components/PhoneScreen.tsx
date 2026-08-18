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
}

// Get the native scrollbar width to hide it properly in the iframe
let cachedScrollbarWidth: number | null = null;
function getNativeScrollbarWidth(): number {
  if (cachedScrollbarWidth !== null) return cachedScrollbarWidth;
  
  const iframe = document.createElement('iframe');
  iframe.style.cssText = 'position: absolute; top: -9999px; width: 100px; height: 100px; visibility: hidden; border: none;';
  document.body.appendChild(iframe);
  
  let width = 0;
  try {
    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write('<!DOCTYPE html><html><head><style>body { margin: 0; padding: 0; overflow-y: scroll; }</style></head><body></body></html>');
      doc.close();
      width = 100 - doc.documentElement.clientWidth;
    }
  } catch (e) {
    width = 17; // Fallback to Windows default
  } finally {
    document.body.removeChild(iframe);
  }
  
  cachedScrollbarWidth = width;
  return width;
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
}: PhoneScreenProps) {
  const showIframe = status === 'loading' || status === 'loaded';
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    setScrollbarWidth(getNativeScrollbarWidth());
  }, []);

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
      {status === 'idle' && (
        <div className="phone-screen-idle-layout">
          <StatusBar displayUrl="Enter your localhost link" onClick={onAddressBarClick} />
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
            flexDirection: 'column'
          }}
        >
          <StatusBar displayUrl={displayUrl} onClick={onAddressBarClick} />
          
          <div className="phone-screen-iframe-container" style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            <iframe
              ref={iframeRef}
              className="phone-screen-iframe"
              style={{ 
                width: `calc(100% + ${scrollbarWidth}px)`,
                paddingRight: scrollbarWidth > 0 ? `${scrollbarWidth}px` : '0px',
                boxSizing: 'content-box'
              }}
              src={currentUrl}
              title="Website Preview"
              onLoad={onLoad}
              onError={onError}
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-popups-to-escape-sandbox"
              allow="accelerometer; camera; encrypted-media; geolocation; gyroscope; microphone"
            />
          </div>
        </div>
      )}
    </div>
  );
}
