import './AboutPage.css';

export function AboutPage() {
  return (
    <main className="about">
      <div className="about-inner">
        <h1 className="about-title">About PremDevView</h1>

        <section className="about-section">
          <h2>What is PremDevView?</h2>
          <p>
            PremDevView is a lightweight, free developer tool for previewing websites inside
            a mobile-sized Android viewport. Instead of fiddling with Chrome DevTools' device
            toolbar, simply enter your localhost URL and see your website inside a beautiful
            virtual phone.
          </p>
        </section>

        <section className="about-section">
          <h2>How It Works</h2>
          <p>
            PremDevView loads your website inside an <code>iframe</code> within a virtual phone
            frame. The iframe is sized to the exact mobile viewport dimensions you select, so
            your website renders its responsive layout as it would on a real device.
          </p>
          <p>
            Everything runs in your browser — no backend, no data collection, no tracking.
            Your URLs never leave your machine.
          </p>
        </section>

        <section className="about-section">
          <h2>Browser-Based Limitations</h2>
          <p>
            Because PremDevView is a web application using iframes, there are inherent browser
            security limitations:
          </p>
          <ul>
            <li>
              <strong>X-Frame-Options / CSP:</strong> Websites that set <code>X-Frame-Options: DENY</code> or
              restrictive <code>Content-Security-Policy</code> headers cannot be displayed inside iframes.
              PremDevView cannot bypass these restrictions.
            </li>
            <li>
              <strong>CORS:</strong> Cross-origin security policies may prevent certain interactions
              between PremDevView and the previewed website.
            </li>
            <li>
              <strong>Localhost detection:</strong> Browser security restricts reliable detection of
              running localhost servers from a hosted web page. The "Try Common Ports" feature uses
              best-effort detection and may not always be accurate.
            </li>
            <li>
              <strong>HMR / Hot Reload:</strong> Development server hot module replacement (HMR) may
              work when PremDevView is served from the same origin, but cross-origin iframe restrictions
              can interfere with WebSocket connections used by Vite, webpack, etc.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Future Plans</h2>
          <p>
            A Chrome Extension is planned that will provide deeper localhost integration, automatic
            port detection, and the ability to embed websites that restrict iframes. The core
            architecture is built to support this future expansion.
          </p>
        </section>

        <section className="about-section">
          <h2>Privacy</h2>
          <p>
            PremDevView does not track users, store browsing history on any server, send URLs to
            third-party services, display advertisements, or use analytics. Local preferences
            (device, zoom, last URL) are stored only in your browser's localStorage and can be
            cleared at any time.
          </p>
        </section>

        <section className="about-section about-section-footer">
          <p>
            <strong>PremDevView</strong> · PREVIEW. TEST. GO MOBILE. <img src="/logo.png" alt="Logo" style={{ width: '16px', height: '16px', verticalAlign: 'middle', marginLeft: '4px' }} />
          </p>
        </section>
      </div>
    </main>
  );
}
