import './AboutPage.css';

export function AboutPage() {
  return (
    <main className="about">
      <div className="about-inner">
        <h1 className="about-title">About PremDevView</h1>

        {/* About PremDevView Section */}
        <section className="about-section">
          <h2>What is PremDevView?</h2>
          <p>
            <strong>PremDevView</strong> is an ultra-fast, lightweight developer utility designed specifically to help web developers test, inspect, and experience their <strong>localHost and un-deployed web projects</strong> inside a realistic virtual smartphone environment.
          </p>
          <p>
            Standard browser developer tools (like Chrome DevTools) shrink web pages artificially, but they fail to capture the authentic feeling, bezel padding, and true mobile proportions of a real physical device. PremDevView bridges this gap by giving developers a distraction-free, dedicated mobile preview workspace.
          </p>
        </section>

        {/* Key Features */}
        <section className="about-section">
          <h2>Key Capabilities</h2>
          <ul>
            <li>
              <strong>Direct Localhost Streaming:</strong> Native zero-latency integration with local development servers (Vite, React, Next.js, Live Server, Python, Node.js) with instant smart port detection.
            </li>
            <li>
              <strong>Hardware-Accelerated Orientation:</strong> Seamlessly flip between Portrait and Landscape orientations with smooth 60fps animations and authentic device bezels.
            </li>
            <li>
              <strong>History Navigation Controls:</strong> Dedicated Back (&lt;) and Forward (&gt;) controls that allow seamless page navigation across multi-page local web apps.
            </li>
            <li>
              <strong>100% Client-Side Privacy:</strong> Everything runs locally inside your browser. No external tracking, no backend database, and your development links never leave your machine.
            </li>
          </ul>
        </section>

        {/* Limitations Section */}
        <section className="about-section">
          <h2>Important Limitations (What Works & What Doesn't)</h2>
          <p>
            PremDevView is built from the ground up for developers to test their own un-deployed code. Here is a clear breakdown of preview compatibility:
          </p>
          <ul>
            <li>
              <strong>✅ Local & Un-deployed Projects (100% Supported):</strong> 
              Development servers running on <code>localhost</code>, <code>127.0.0.1</code>, custom local ports (e.g. <code>5173</code>, <code>3000</code>, <code>5500</code>), or local network IPs (e.g. <code>192.168.x.x</code>) load at native speeds directly without external proxies.
            </li>
            <li>
              <strong>⚠️ Standard Public Websites (Supported via Proxy):</strong> 
              Public websites without rigid embedding restrictions are automatically routed through a high-performance CORS proxy to bypass standard browser iframe barriers.
            </li>
            <li>
              <strong>❌ High-Security Enterprise Sites (Blocked by Design):</strong> 
              Major platforms (Google, Facebook, Instagram, banking portals) deliberately send <code>X-Frame-Options: DENY</code> and strict Content-Security-Policy headers that browsers block from being embedded in any iframe.
            </li>
          </ul>
        </section>

        {/* Privacy & Trust */}
        <section className="about-section">
          <h2>Privacy & Open Collaboration</h2>
          <p>
            PremDevView is free, open, and respectful of developer privacy. We do not store your browsing history, run intrusive ads, or collect analytical telemetry. Feel free to connect or share your suggestions through the social links above!
          </p>
        </section>

        {/* Footer */}
        <section className="about-section about-section-footer">
          <p>
            <strong>PremDevView</strong> · Built with ❤️ by <strong>Prem Sagar Pandey</strong> · PREVIEW. TEST. GO MOBILE.
          </p>
        </section>
      </div>
    </main>
  );
}
