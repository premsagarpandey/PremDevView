import { PhoneScreen } from './PhoneScreen';
import { StatusBar } from './StatusBar';
import type { ErrorType } from '../hooks/usePreview';
import './PhoneFrame.css';

interface PhoneFrameProps {
  dimensions: { width: number; height: number };

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
            errorType={errorType || null}
            errorMessage={errorMessage || ''}
            width={dimensions.width}
            height={dimensions.height}
            iframeRef={iframeRef || { current: null }}
            onLoad={onIframeLoad || (() => {})}
            onError={onIframeError || (() => {})}
          />
        </div>
      </div>
    </div>
  );
}
