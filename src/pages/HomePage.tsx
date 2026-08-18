
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
      {/* Mobile Intro Banner (Visible only on mobile/Android devices) */}
      <div className="mobile-intro-banner">
        <span className="mobile-intro-badge">📱 Virtual Phone Simulator</span>
        <h1 className="mobile-intro-heading">Preview Localhost & Web Apps</h1>
        <p className="mobile-intro-desc">
          Test un-deployed web projects inside an authentic virtual smartphone screen.
        </p>
      </div>

      {/* Toolbar / URL Input */}
      <div className="top-right-toolbar">
        <div className="url-floating-group">
          <UrlInput defaultUrl={previewState.url} onSubmit={(url) => previewActions.loadUrl(url)} />
        </div>
        
        {/* Controls Row on Mobile / Floating Column on Desktop */}
        <div className="mobile-controls-row">
          {/* View Group */}
          <div className="toolbar-group orientation-group" style={{ alignItems: 'flex-end', marginTop: '8px' }}>
            <button className="toolbar-btn text-btn primary-btn" onClick={viewportActions.toggleOrientation}>
              {viewportState.isLandscape ? 'Change to Portrait' : 'Change to Landscape'}
            </button>
          </div>

          {/* Navigation Group */}
          <div className="toolbar-group nav-arrows-group" style={{ justifyContent: 'flex-end', marginTop: '8px', flexDirection: 'row', gap: '8px' }}>
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

      {/* Mobile Pro Tip Card */}
      <div className="mobile-desktop-notice">
        <div className="notice-icon">💡</div>
        <div className="notice-content">
          <h4>Best Experienced on Desktop</h4>
          <p>
            Open <strong>PremDevView</strong> on your laptop/PC browser to test your local development servers (<code>localhost:3000</code>, <code>localhost:5173</code>, etc.) live while coding!
          </p>
        </div>
      </div>
    </main>
  );
}
