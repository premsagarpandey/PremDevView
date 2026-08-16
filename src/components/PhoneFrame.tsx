import { useState, useEffect } from 'react';
import { PhoneScreen } from './PhoneScreen';
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
}

export function PhoneFrame({
  dimensions,
  isLandscape,
  status,
  currentUrl,
  errorType,
  errorMessage,
  iframeRef,
  onIframeLoad,
  onIframeError,
  onAddressBarClick,
}: PhoneFrameProps) {
  const displayUrl = currentUrl.replace(/[?&]_pdv_r=\d+/, '');
  
  const [internalDims, setInternalDims] = useState(dimensions);
  const [internalLandscape, setInternalLandscape] = useState(isLandscape);
  const [fadeOpacity, setFadeOpacity] = useState(1);

  useEffect(() => {
    if (isLandscape !== internalLandscape) {
      setFadeOpacity(0); // Start fade out
      const timer = setTimeout(() => {
        setInternalDims(dimensions);
        setInternalLandscape(isLandscape);
        setFadeOpacity(1); // Fade back in
      }, 200); // 200ms fade duration
      return () => clearTimeout(timer);
    } else if (dimensions.width !== internalDims.width || dimensions.height !== internalDims.height) {
      // If dimensions change without orientation change (e.g. window resize)
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
        transition: 'opacity 0.2s ease-in-out',
      } as React.CSSProperties}
    >
      <div className={`phone-frame ${internalLandscape ? 'landscape' : ''}`}>
        <div className="phone-frame-camera"></div>

        <div className="phone-frame-screen">
          <PhoneScreen
            status={status}
            currentUrl={currentUrl}
            errorType={errorType || null}
            errorMessage={errorMessage || ''}
            width={dimensions.width}
            height={dimensions.height}
            iframeRef={iframeRef || { current: null }}
            onLoad={onIframeLoad || (() => {})}
            onError={onIframeError || (() => {})}
            displayUrl={displayUrl}
            onAddressBarClick={onAddressBarClick}
          />
        </div>
      </div>
    </div>
  );
}
