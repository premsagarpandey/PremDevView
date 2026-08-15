import { useState } from 'react';
import { usePreview } from '../hooks/usePreview';
import { useViewport } from '../hooks/useViewport';

import { useFullscreen } from '../hooks/useFullscreen';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { PhoneFrame } from '../components/PhoneFrame';
import { UrlInput } from '../components/UrlInput';
import './HomePage.css';

export function HomePage() {
  const [previewState, previewActions] = usePreview();
  const [viewportState, viewportActions] = useViewport();

  const [, fullscreenActions] = useFullscreen();

  const [showUrlInput, setShowUrlInput] = useState(false);

  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onBack: previewActions.goBack,
    onForward: previewActions.goForward,
    onReload: previewActions.reload,

    onRotate: viewportActions.toggleOrientation,
    onFullscreen: fullscreenActions.toggleFullscreen,
  });

  const handleUrlSubmit = (url: string) => {
    previewActions.loadUrl(url);
    setShowUrlInput(false);
  };

  return (
    <main className="canvas-layout" ref={fullscreenActions.fullscreenContainerRef}>
      


      {/* Right Vertical Toolbar */}
      <div className="floating-toolbar">
        {/* Navigation Group */}
        <div className="toolbar-group">
          <button className="toolbar-btn" aria-label="Back" title="Back" onClick={previewActions.goBack}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="toolbar-btn" aria-label="Forward" title="Forward" onClick={previewActions.goForward}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
          </button>
          <button className="toolbar-btn" aria-label="Reload" title="Reload" onClick={previewActions.reload}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2v6h-6"></path><path d="M3 12a9 9 0 102.6-6.4L21 8"></path></svg>
          </button>
        </div>
        
        {/* View Group */}
        <div className="toolbar-group">
          <button className="toolbar-btn" aria-label="Rotate" title="Rotate" onClick={viewportActions.toggleOrientation}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
          </button>

          <button className="toolbar-btn" aria-label="Fullscreen" title="Fullscreen" onClick={fullscreenActions.toggleFullscreen}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
          </button>
        </div>
      </div>

      {/* Main Canvas Area */}
      <section className="canvas-phone">
        <PhoneFrame
          dimensions={viewportState.dimensions}
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
