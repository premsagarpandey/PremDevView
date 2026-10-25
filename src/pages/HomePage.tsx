import { usePreview } from '../hooks/usePreview';
import { useViewport } from '../hooks/useViewport';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { PhoneFrame } from '../components/PhoneFrame';
import { UrlInput } from '../components/UrlInput';
import './HomePage.css';

export function HomePage() {
  const [previewState, previewActions] = usePreview();
  const [viewportState, viewportActions] = useViewport();

  // Register keyboard shortcuts: R for rotate orientation
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

  const handleHomeClick = () => {
    if (previewState.url) {
      try {
        const parsed = new URL(previewState.url);
        previewActions.loadUrl(parsed.origin);
      } catch {
        handleFocusInput();
      }
    } else {
      handleFocusInput();
    }
  };

  return (
    <main className="canvas-layout">
      {/* Mobile Intro Banner (Shown on small viewports) */}
      <div className="mobile-intro-banner">
        <span className="mobile-intro-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
            <path d="M12 18h.01" />
          </svg>
          Device Simulator
        </span>
        <h1 className="mobile-intro-heading">PremDevView — Localhost Mobile Preview</h1>
        <p className="mobile-intro-desc">
          Test localhost and un-deployed web applications inside an authentic virtual smartphone screen.
        </p>
      </div>

      {/* Floating Control Hub */}
      <div className="canvas-control-panel">
        <div className="url-panel-card">
          <UrlInput defaultUrl={previewState.url} onSubmit={(url) => previewActions.loadUrl(url)} />
        </div>

        {/* Action Controls Toolbar */}
        <div className="canvas-actions-row">
          {/* Orientation Toggle */}
          <button
            type="button"
            className="toolbar-action-btn orientation-btn"
            onClick={viewportActions.toggleOrientation}
            title={`Switch to ${viewportState.isLandscape ? 'Portrait' : 'Landscape'} mode (Press R)`}
            aria-label="Toggle device orientation"
          >
            <svg
              className={`rotate-icon ${viewportState.isLandscape ? 'landscape' : ''}`}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
              <path d="M12 18h.01" />
            </svg>
            <span>{viewportState.isLandscape ? 'Portrait' : 'Landscape'}</span>
            <kbd className="shortcut-badge">R</kbd>
          </button>

          {/* Browser Navigation Group */}
          <div className="toolbar-nav-group" role="group" aria-label="Preview navigation">
            <button
              type="button"
              className="toolbar-icon-btn"
              onClick={previewActions.goBack}
              disabled={!previewState.canGoBack}
              title="Go Back"
              aria-label="Go Back in Preview"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              className="toolbar-icon-btn"
              onClick={previewActions.goForward}
              disabled={!previewState.canGoForward}
              title="Go Forward"
              aria-label="Go Forward in Preview"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <button
              type="button"
              className="toolbar-icon-btn reload-btn"
              onClick={previewActions.reload}
              title="Reload Preview"
              aria-label="Reload Preview"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15.55-6.36L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15.55 6.36L3 16" />
              </svg>
            </button>
          </div>

          {/* Viewport Dimension Indicator */}
          <div className="dimension-badge" title="Active viewport resolution">
            {viewportState.dimensions.width} × {viewportState.dimensions.height}
          </div>
        </div>
      </div>

      {/* Main Canvas Area */}
      <section className="canvas-phone" aria-label="Interactive Phone Preview">
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
          onReload={previewActions.reload}
          onHome={handleHomeClick}
        />
      </section>

      {/* Helpful Desktop Tip Banner on Mobile */}
      <div className="mobile-desktop-notice">
        <div className="notice-icon">💡</div>
        <div className="notice-content">
          <h4>Pro Tip for Developers</h4>
          <p>
            Open <strong>PremDevView</strong> on your desktop browser alongside VS Code / terminal to preview live hot reload for <code>localhost:3000</code>, <code>5173</code>, or <code>5500</code>!
          </p>
        </div>
      </div>
    </main>
  );
}
