import './HowToUsePage.css';

export function HowToUsePage() {
  return (
    <main className="how-to-use">
      <div className="how-to-use-inner">
        <header className="how-to-use-header">
          <h1 className="how-to-use-title">How to Use PremDevView</h1>
          <p className="how-to-use-subtitle">
            A comprehensive, developer-friendly guide to testing your{' '}
            <span className="how-to-use-highlight">
              localhost & un-deployed web projects
            </span>{' '}
            in an authentic virtual mobile view.
          </p>
        </header>

        {/* Golden Rule Banner */}
        <div className="how-to-use-alert">
          <strong>⚡ Golden Rule:</strong> Your local development server must be{' '}
          <strong>actively running in the background</strong> (e.g. <code>npm run dev</code> in your terminal or <code>Live Server</code> in VS Code). PremDevView renders the live stream directly from your local machine.
        </div>

        {/* Step 1 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">1</span> Run your Local Server</h2>
          <p>
            Start your project's development server in your terminal or editor:
          </p>
          <ul>
            <li>
              <strong>React, Vite, Next.js, Vue, or Angular:</strong>
              <br />
              Run <code>npm run dev</code> or <code>npm start</code>
              <br />
              (Your terminal will display a local address, e.g. <code>http://localhost:5173</code> or <code>http://localhost:3000</code>).
            </li>
            <li>
              <strong>HTML, CSS & JavaScript (VS Code Live Server):</strong>
              <br />
              Right-click your HTML file and select <strong>"Open with Live Server"</strong> (typically port <code>5500</code>).
            </li>
            <li>
              <strong>Node.js / Python (Express, Django, Flask, FastAPI):</strong>
              <br />
              Start your server (e.g. <code>python app.py</code> or <code>node server.js</code>).
            </li>
          </ul>
          <div className="how-to-use-tip">
            <strong>💡 Note:</strong> Keep the terminal or VS Code process running while testing.
          </div>
        </section>

        {/* Step 2 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">2</span> Copy your Local Address or Port</h2>
          <p>
            PremDevView supports flexible input formats:
          </p>
          <ul>
            <li><strong>Full Localhost URL:</strong> <code>http://localhost:3000</code> or <code>http://localhost:5173</code></li>
            <li><strong>Port Shortcut:</strong> Type just the port number (e.g. <code>3000</code> or <code>5173</code>) or click a quick-launch port badge.</li>
            <li><strong>Live Server Link:</strong> <code>http://127.0.0.1:5500/index.html</code></li>
            <li><strong>Local Network IP:</strong> <code>http://192.168.1.10:3000</code> for testing on Wi-Fi devices.</li>
          </ul>
        </section>

        {/* Step 3 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">3</span> Paste & Preview</h2>
          <p>
            Enter the address in the top toolbar on the <strong>Preview</strong> tab:
          </p>
          <ul>
            <li>Paste your URL or type a port into the input box.</li>
            <li>Click <strong>"Preview"</strong> or press <kbd className="kbd-shortcut">Enter ↵</kbd>.</li>
            <li>Your un-deployed website immediately streams inside the phone screen.</li>
          </ul>
        </section>

        {/* Step 4 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">4</span> Test Responsiveness & Interactions</h2>
          <p>
            Experience your site exactly as a mobile user would:
          </p>
          <ul>
            <li>
              <strong>Orientation Toggle:</strong> Click <strong>"Landscape"</strong> or press <kbd className="kbd-shortcut">R</kbd> on your keyboard to switch between portrait and landscape viewports.
            </li>
            <li>
              <strong>History Controls:</strong> Use the <strong>&lt;</strong> and <strong>&gt;</strong> buttons to move through navigation history, and <strong>⟳</strong> to trigger a reload.
            </li>
            <li>
              <strong>Touch Simulation:</strong> Test mobile menus, form inputs, modals, touch tap targets, and smooth scroll animations.
            </li>
          </ul>
        </section>

        {/* Troubleshooting Guide */}
        <section className="how-to-use-section troubleshoot-section">
          <h2>🛠️ Troubleshooting & Solutions</h2>
          <p>
            If your website isn't rendering as expected, check these common scenarios:
          </p>

          <div className="troubleshoot-grid">
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 1</span>
                <h3 className="troubleshoot-title">"Cannot connect" or blank preview</h3>
              </div>
              <div className="troubleshoot-body">
                The local dev server is stopped, crashed, or running on a different port.
              </div>
              <div className="troubleshoot-solution">
                <strong>Solution:</strong> Verify that your terminal process is active (e.g. <code>npm run dev</code> is running and listening).
              </div>
            </div>

            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 2</span>
                <h3 className="troubleshoot-title">VS Code Live Server (Port 5500) shows 404</h3>
              </div>
              <div className="troubleshoot-body">
                Live Server often requires the exact HTML file path (e.g. <code>/frontend/index.html</code>) rather than just the port number.
              </div>
              <div className="troubleshoot-solution">
                <strong>Solution:</strong> Copy the exact path from your browser when Live Server launches (e.g. <code>http://127.0.0.1:5500/index.html</code>).
              </div>
            </div>

            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 3</span>
                <h3 className="troubleshoot-title">External sites (Google, Facebook) are blocked</h3>
              </div>
              <div className="troubleshoot-body">
                Major commercial platforms enforce strict <code>X-Frame-Options: DENY</code> headers preventing iframe embedding.
              </div>
              <div className="troubleshoot-solution">
                <strong>Solution:</strong> PremDevView is built for your own un-deployed code and local development servers, which do not restrict embedding.
              </div>
            </div>

            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 4</span>
                <h3 className="troubleshoot-title">Layout looks zoomed out or desktop-sized</h3>
              </div>
              <div className="troubleshoot-body">
                The HTML project is missing the standard responsive viewport meta tag.
              </div>
              <div className="troubleshoot-solution">
                <strong>Solution:</strong> Add <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> in your project's <code>&lt;head&gt;</code>.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
