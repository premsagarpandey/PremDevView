import './AboutPage.css';

export function AboutPage() {
  return (
    <main className="about">
      <div className="about-inner">
        <h1 className="about-title">About PremDevView</h1>

        <section className="about-section">
          <h2>What is PremDevView?</h2>
          <p>
            PremDevView is a beautifully crafted, lightweight developer tool built for previewing websites
            inside a pixel-perfect virtual mobile device. Say goodbye to the clunky Chrome DevTools device
            toolbar — just enter your localhost or production URL and experience your responsive designs
            in an immersive, distraction-free environment.
          </p>
        </section>

        <section className="about-section">
          <h2>Key Features</h2>
          <ul>
            <li>
              <strong>Pixel-Perfect Rendering:</strong> Your website is loaded inside a perfectly scaled
              iframe that accurately mimics an Android device viewport.
            </li>
            <li>
              <strong>Cinematic Rotation:</strong> Switch seamlessly between Portrait and Landscape orientations 
              with hardware-accelerated animations and mathematically perfect bezel symmetry.
            </li>
            <li>
              <strong>Zero Backend:</strong> Everything runs 100% locally in your browser. No data collection,
              no tracking, and your URLs never leave your machine.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Browser Limitations</h2>
          <p>
            Because PremDevView runs entirely in the browser using iframes, some security restrictions apply:
          </p>
          <ul>
            <li>
              <strong>X-Frame-Options:</strong> Websites enforcing restrictive headers (like <code>DENY</code>) 
              cannot be embedded. This tool is best used for your own local development servers where you control the headers.
            </li>
            <li>
              <strong>HMR (Hot Reloading):</strong> Development servers that strictly block cross-origin WebSockets 
              might have issues with automatic hot-reloading when embedded.
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Privacy & Security</h2>
          <p>
            We take your privacy seriously. PremDevView does not track you, store history on any server,
            display ads, or use external analytics. The few preferences that are saved (like your current theme)
            stay strictly within your browser's local storage.
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
