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

  return (
    <div 
      className="phone-frame-container"
      style={{
        '--viewport-width': dimensions.width,
        '--viewport-height': dimensions.height,
      } as React.CSSProperties}
    >
      <div className={`phone-frame ${isLandscape ? 'landscape' : ''}`}>
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
