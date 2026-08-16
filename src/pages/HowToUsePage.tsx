import './HowToUsePage.css';

export function HowToUsePage() {
  return (
    <main className="how-to-use">
      <div className="how-to-use-inner">
        <div>
          <h1 className="how-to-use-title">How to Use PremDevView</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '17px', fontWeight: 600, lineHeight: '1.7', marginTop: '10px' }}>
            A complete beginner-friendly step-by-step guide to testing your{' '}
            <strong style={{ fontSize: '20px', fontWeight: 900, color: 'var(--text-primary)', background: 'rgba(59, 130, 246, 0.12)', padding: '3px 10px', borderRadius: '6px', border: '1px solid rgba(59, 130, 246, 0.25)', display: 'inline-block' }}>
              localHost & un-deployed web projects
            </strong>{' '}
            in a realistic mobile view.
          </p>
        </div>

        {/* Golden Rule Alert */}
        <div className="how-to-use-alert">
          <strong>⚡ Golden Rule (Most Important):</strong> Your local development project must be 
          <strong> RUNNING in the background</strong> on your computer (e.g. running <code>npm run dev</code> in your terminal or <code>Live Server</code> in VS Code). 
          PremDevView streams the live website directly from your active local server!
        </div>

        {/* Step 1 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">1</span> Run your Project in the Background</h2>
          <p>
            First, start your project's local development server:
          </p>
          <ul>
            <li>
              <strong>React, Vite, Next.js, Vue, or Angular projects:</strong> Open your terminal and run:
              <br />
              <code>npm run dev</code> or <code>npm start</code>
              <br />
              (Note down the local URL provided in your terminal, such as <code>http://localhost:5173</code> or <code>http://localhost:3000</code>).
            </li>
            <li>
              <strong>HTML, CSS & JavaScript (VS Code Live Server):</strong> Right-click your <code>index.html</code> file in VS Code and select <strong>"Open with Live Server"</strong> (this typically runs on <code>http://127.0.0.1:5500/</code>).
            </li>
            <li>
              <strong>Node.js / Python (Flask, Django):</strong> Start your server script (e.g. <code>python app.py</code> or <code>node server.js</code>).
            </li>
          </ul>
          <div className="how-to-use-tip">
            <strong>💡 Note:</strong> Keep your terminal or VS Code running. The development server must stay active in the background.
          </div>
        </section>

        {/* Step 2 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">2</span> Copy your Local URL or Port</h2>
          <p>
            Copy the address of your running local project. PremDevView accepts multiple formats:
          </p>
          <ul>
            <li><strong>Full Localhost URL:</strong> <code>http://localhost:3000</code> or <code>http://localhost:5173</code></li>
            <li><strong>Live Server Link:</strong> <code>http://127.0.0.1:5500/index.html</code> or <code>http://127.0.0.1:5500/frontend/index.html</code></li>
            <li><strong>Local Network IP:</strong> <code>http://192.168.1.5:3000</code></li>
            <li><strong>Direct Port Shortcut:</strong> You can even just type the port number directly (e.g. <code>5173</code> or <code>5500</code>) — PremDevView will automatically format it for you!</li>
          </ul>
        </section>

        {/* Step 3 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">3</span> Paste & Open Mobile Preview</h2>
          <p>
            Return to PremDevView and start testing:
          </p>
          <ul>
            <li>Click on the <strong>"Preview"</strong> tab in the left sidebar.</li>
            <li>In the top-right corner, find the <strong>"ENTER YOUR LINK HERE"</strong> input box.</li>
            <li>Paste your URL and click the <strong>"Open Mobile Preview"</strong> button.</li>
            <li>Your un-deployed project will immediately render inside the phone frame!</li>
          </ul>
        </section>

        {/* Step 4 */}
        <section className="how-to-use-section">
          <h2><span className="step-number">4</span> Test Responsiveness & Interaction</h2>
          <p>
            Interact with your site just like a real mobile user:
          </p>
          <ul>
            <li><strong>Landscape & Portrait Mode:</strong> Click the <strong>"Change to Landscape"</strong> button in the top-right widget to test wide screen responsiveness.</li>
            <li><strong>Back & Forward Navigation:</strong> Use the circular <strong>&lt;</strong> and <strong>&gt;</strong> buttons directly below the landscape button to navigate between pages inside your website.</li>
            <li><strong>Real Touch Simulation:</strong> Click buttons, test dropdowns/modals, submit forms, and test smooth scrolling.</li>
          </ul>
        </section>

        {/* Step 5 / Troubleshooting Section */}
        <section className="how-to-use-section" style={{ marginTop: '16px' }}>
          <h2 style={{ color: '#ef4444' }}>🛠️ Common Problems & Solutions (Troubleshooting Guide)</h2>
          <p>
            If your website is not loading properly, check the solutions below:
          </p>

          <div className="troubleshoot-grid">
            {/* Problem 1 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 1</span>
                <h3 className="troubleshoot-title">"This site can't be reached" / "ERR_CONNECTION_REFUSED" or Blank Screen</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Your local development server is not running or stopped in the background.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> Check your terminal or VS Code and restart your server (e.g. run <code>npm run dev</code> or start Live Server). Ensure the terminal stays open while testing.
              </div>
            </div>

            {/* Problem 2 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 2</span>
                <h3 className="troubleshoot-title">VS Code Live Server (Port 5500) shows "404 Page Not Found"</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Live Server often requires the exact file path (e.g. <code>/frontend/index.html</code>) rather than just the port number.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> When VS Code opens your browser with Live Server, copy the full URL from the browser's address bar (e.g. <code>http://127.0.0.1:5500/frontend/index.html</code>) and paste it into PremDevView.
              </div>
            </div>

            {/* Problem 3 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 3</span>
                <h3 className="troubleshoot-title">External live websites (Google, Facebook, Instagram) do not load</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Large platforms enforce strict security policies (<code>X-Frame-Options: DENY</code> and CSP) to prevent third-party iframe embedding.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> PremDevView is specifically built to preview and test your <strong>own local & un-deployed projects</strong>. Local development servers have no such restrictions and work 100% reliably.
              </div>
            </div>

            {/* Problem 4 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 4</span>
                <h3 className="troubleshoot-title">Code changes are not reflecting in the preview</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Browser cache or temporary hot-module reload disconnection.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> Click the "Open Mobile Preview" button again or refresh the PremDevView page to force-reload the latest changes.
              </div>
            </div>

            {/* Problem 5 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 5</span>
                <h3 className="troubleshoot-title">Website looks tiny, zoomed out, or not formatted like mobile</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Missing the standard responsive viewport meta tag in your HTML <code>&lt;head&gt;</code>.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> Add <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code> inside your project's <code>index.html</code> inside the <code>&lt;head&gt;</code> tag so the browser scales fonts and layouts properly.
              </div>
            </div>

            {/* Problem 6 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 6</span>
                <h3 className="troubleshoot-title">Back (&lt;) and Forward (&gt;) buttons do not navigate</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> You have not clicked on multiple pages yet in the current preview session, so there is no previous history to jump to.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> Click on internal links or page transitions inside your previewed app. Once history entries exist, the <strong>&lt;</strong> and <strong>&gt;</strong> buttons will seamlessly navigate backward and forward.
              </div>
            </div>

            {/* Problem 7 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 7</span>
                <h3 className="troubleshoot-title">Broken Images, Icons, or Missing CSS styles</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Assets are linked using absolute disk paths (e.g. <code>C:\Users\...</code> or <code>file:///</code>) instead of relative web paths.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> Always use relative paths like <code>./assets/logo.png</code> or <code>/logo.png</code> so your local development server can serve images and stylesheets correctly.
              </div>
            </div>

            {/* Problem 8 */}
            <div className="troubleshoot-card">
              <div className="troubleshoot-header">
                <span className="troubleshoot-badge">Problem 8</span>
                <h3 className="troubleshoot-title">"Invalid URL" warning when entering a link</h3>
              </div>
              <div className="troubleshoot-body">
                <strong>Reason:</strong> Missing port or improper protocol format.
              </div>
              <div className="troubleshoot-solution">
                <strong>✅ Solution:</strong> You can simply type your raw port number (e.g. <code>5173</code>, <code>3000</code>, or <code>5500</code>) or enter the full URL starting with <code>http://</code>. PremDevView will automatically format raw numbers into full localhost links.
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
