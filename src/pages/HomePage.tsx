import { useState } from 'react';
import { usePreview } from '../hooks/usePreview';
import { useViewport } from '../hooks/useViewport';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { PhoneFrame } from '../components/PhoneFrame';
import { UrlInput } from '../components/UrlInput';
import './HomePage.css';

export function HomePage() {
  const [previewState, previewActions] = usePreview();
  const [viewportState, viewportActions] = useViewport();

  const [showUrlInput, setShowUrlInput] = useState(false);

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onRotate: viewportActions.toggleOrientation,
  });

  const handleUrlSubmit = (url: string) => {
    previewActions.loadUrl(url);
    setShowUrlInput(false);
  };

  return (
    <main className="canvas-layout">
      


      {/* Right Vertical Toolbar */}
      <div className="floating-toolbar">
        {/* View Group */}
        <div className="toolbar-group">
          <button className="toolbar-btn text-btn primary-btn" onClick={viewportActions.toggleOrientation}>
            {viewportState.isLandscape ? 'Change to Portrait' : 'Change to Landscape'}
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <section className="canvas-phone">
        <PhoneFrame
          dimensions={viewportState.dimensions}
          isLandscape={viewportState.isLandscape}
          status={previewState.status}
          currentUrl={previewState.currentUrl}
          errorType={previewState.errorType}
          errorMessage={previewState.errorMessage}
          iframeRef={previewActions.iframeRef}
          onIframeLoad={previewActions.onIframeLoad}
          onIframeError={previewActions.onIframeError}
          onAddressBarClick={() => setShowUrlInput(true)}
        />
        
      </section>

      {/* URL Input Popover */}
      {showUrlInput && (
        <div className="url-popover-overlay" onClick={() => setShowUrlInput(false)}>
          <div className="url-popover-content" onClick={(e) => e.stopPropagation()}>
            <UrlInput defaultUrl={previewState.url} onSubmit={handleUrlSubmit} />
          </div>
        </div>
      )}

    </main>
  );
}
