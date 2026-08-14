import { useState } from 'react';
import { PhoneScreen } from './PhoneScreen';
import { StatusBar } from './StatusBar';
import './PhoneFrame.css';

interface PhoneFrameProps {
  dimensions: { width: number; height: number };
  isLandscape: boolean;

  status: 'idle' | 'loading' | 'loaded' | 'error';
  currentUrl: string;
  errorType?: 'network' | 'timeout' | 'security' | 'not-found';
  errorMessage?: string;
  iframeRef?: React.RefObject<HTMLIFrameElement>;
  onIframeLoad?: () => void;
  onIframeError?: () => void;
  onBack?: () => void;
  onHome?: () => void;
  onAddressBarClick?: () => void;
}

export function PhoneFrame({
  dimensions,
  isLandscape, // No longer used for CSS classes since dimensions are pre-swapped by useViewport

  status,
  currentUrl,
  errorType,
  errorMessage,
  iframeRef,
  onIframeLoad,
  onIframeError,
  onAddressBarClick,
}: PhoneFrameProps) {
  // Extract the displayable URL (without reload query param)
  const displayUrl = currentUrl.replace(/[?&]_pdv_r=\d+/, '');

  return (
    <div 
      className="phone-frame-container"
      style={{
        // We pass the exact CSS viewport dimensions as variables
        '--viewport-width': dimensions.width,
        '--viewport-height': dimensions.height,

      } as React.CSSProperties}
    >
      <div className="phone-frame">
        {/* Android Camera Punch-hole */}
        <div className="phone-frame-camera"></div>

        {/* Screen area (the exact aspect-ratio container) */}
        <div className="phone-frame-screen">
          <StatusBar displayUrl={displayUrl} onClick={onAddressBarClick} />
          <PhoneScreen
            status={status}
            currentUrl={currentUrl}
            errorType={errorType}
            errorMessage={errorMessage}
            width={dimensions.width}
            height={dimensions.height}
            iframeRef={iframeRef}
            onLoad={onIframeLoad}
            onError={onIframeError}
          />
        </div>
      </div>
    </div>
  );
}
