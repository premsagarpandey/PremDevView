
import { usePreview } from '../hooks/usePreview';
import { useViewport } from '../hooks/useViewport';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { PhoneFrame } from '../components/PhoneFrame';
import { UrlInput } from '../components/UrlInput';
import './HomePage.css';

export function HomePage() {
  const [previewState, previewActions] = usePreview();
  const [viewportState, viewportActions] = useViewport();


  // Register keyboard shortcuts
  useKeyboardShortcuts({
    onRotate: viewportActions.toggleOrientation,
  });


  const handleFocusInput = () => {
    const inputEl = document.getElementById('url-input') as HTMLInputElement | null;
    if (inputEl) {
      inputEl.focus();
      inputEl.select();
    }
  };

  return (
    <main className="canvas-layout">

      {/* Top Right Toolbar */}
      <div className="top-right-toolbar">
        <div className="url-floating-group">
          <UrlInput defaultUrl={previewState.url} onSubmit={(url) => previewActions.loadUrl(url)} />
        </div>
        
        {/* View Group */}
        <div className="toolbar-group" style={{ alignItems: 'flex-end', marginTop: '8px' }}>
          <button className="toolbar-btn text-btn primary-btn" onClick={viewportActions.toggleOrientation}>
            {viewportState.isLandscape ? 'Change to Portrait' : 'Change to Landscape'}
          </button>
        </div>

        {/* Navigation Group */}
        <div className="toolbar-group" style={{ justifyContent: 'flex-end', marginTop: '8px', flexDirection: 'row', gap: '8px' }}>
          <button 
            className="toolbar-btn primary-btn" 
            onClick={() => {
              try {
                previewActions.iframeRef.current?.contentWindow?.history.back();
              } catch {
                // Cross-origin fallback
              }
            }}
            title="Go Back"
            aria-label="Go Back in Preview"
          >
            {'<'}
          </button>
          <button 
            className="toolbar-btn primary-btn" 
            onClick={() => {
              try {
                previewActions.iframeRef.current?.contentWindow?.history.forward();
              } catch {
                // Cross-origin fallback
              }
            }}
            title="Go Forward"
            aria-label="Go Forward in Preview"
          >
            {'>'}
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
          onAddressBarClick={handleFocusInput}
        />

      </section>


    </main>
  );
}
