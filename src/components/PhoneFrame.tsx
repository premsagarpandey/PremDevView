import { useState, useEffect } from 'react';
import { PhoneScreen } from './PhoneScreen';
import { formatDisplayUrl } from '../utils/urlValidation';
import type { ErrorType } from '../hooks/usePreview';
import './PhoneFrame.css';

interface PhoneFrameProps {
  dimensions: { width: number; height: number };
  isLandscape?: boolean;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  currentUrl: string;
  errorType?: ErrorType | null;
  errorMessage?: string;
  iframeRef?: React.RefObject<HTMLIFrameElement | null>;
  onIframeLoad?: () => void;
  onIframeError?: () => void;
  onAddressBarClick?: () => void;
  onReload?: () => void;
  onHome?: () => void;
}

export function PhoneFrame({
  dimensions,
  isLandscape = false,
  status,
  currentUrl,
  errorType,
  errorMessage,
  iframeRef,
  onIframeLoad,
  onIframeError,
  onAddressBarClick,
  onReload,
  onHome,
}: PhoneFrameProps) {
  const displayUrl = formatDisplayUrl(currentUrl);

  const [internalDims, setInternalDims] = useState(dimensions);
  const [internalLandscape, setInternalLandscape] = useState(isLandscape);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    if (isLandscape !== internalLandscape) {
      setFadeOpacity(0);
      const timer = setTimeout(() => {
        setInternalDims(dimensions);
        setInternalLandscape(isLandscape);
        setFadeOpacity(1);
      }, 180);
      return () => clearTimeout(timer);
    } else if (dimensions.width !== internalDims.width || dimensions.height !== internalDims.height) {
      setInternalDims(dimensions);
    }
  }, [isLandscape, dimensions, internalLandscape, internalDims]);

  return (
    <div
      className="phone-frame-container"
      style={{
        '--viewport-width': internalDims.width,
        '--viewport-height': internalDims.height,
        opacity: fadeOpacity,
        transition: 'opacity 0.18s ease-in-out',
      } as React.CSSProperties}
    >
      <div className={`phone-frame ${internalLandscape ? 'landscape' : ''}`}>
        {/* Physical Camera & Sensor Notch */}
        <div className="phone-frame-camera"></div>

        {/* Screen Bezel & Display Viewport */}
        <div className="phone-frame-screen">
          <PhoneScreen
            status={status}
            currentUrl={currentUrl}
            errorType={errorType || null}
            errorMessage={errorMessage || ''}
            width={internalDims.width}
            height={internalDims.height}
            iframeRef={iframeRef || { current: null }}
            onLoad={onIframeLoad || (() => {})}
            onError={onIframeError || (() => {})}
            displayUrl={displayUrl}
            onAddressBarClick={onAddressBarClick}
            onReload={onReload}
            onHome={onHome}
          />
        </div>
      </div>
    </div>
  );
}
