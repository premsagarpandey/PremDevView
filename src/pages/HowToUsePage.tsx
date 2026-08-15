import './HowToUsePage.css';

export function HowToUsePage() {
  return (
    <main className="how-to-use">
      <div className="how-to-use-inner">
        <div>
          <h1 className="how-to-use-title">How to use PremDevView</h1>
          <p style={{ color: 'var(--text-secondary)' }}>A quick guide to testing your localhost projects on a virtual mobile device.</p>
        </div>

        <section className="how-to-use-section">
          <h2><span className="step-number">1</span> Start Your Local Server</h2>
          <p>
            PremDevView doesn't host your code; it previews it. You must have your local development server running first.
          </p>
          <ul>
            <li>For Vite, run <code>npm run dev</code> (usually port 5173).</li>
            <li>For Next.js, run <code>npm run dev</code> (usually port 3000).</li>
            <li>For React/CRA, run <code>npm start</code> (usually port 3000).</li>
          </ul>
        </section>

        <section className="how-to-use-section">
          <h2><span className="step-number">2</span> Enter the URL</h2>
          <p>
            Go to the <strong>Preview</strong> tab. You will see a virtual phone screen.
          </p>
          <ul>
            <li>Click on the pill-shaped URL bar at the top of the phone frame.</li>
            <li>Type in your full localhost URL (e.g., <code>http://localhost:5173</code>) and press Enter.</li>
            <li>Alternatively, click <strong>"Try Common Ports"</strong> to automatically scan ports 3000, 5173, 8000, and 8080.</li>
          </ul>
        </section>

        <section className="how-to-use-section">
          <h2><span className="step-number">3</span> Test and Interact</h2>
          <p>
            Your website will render exactly as it would on a mobile browser using the precise CSS viewport dimensions.
          </p>
          <ul>
            <li><strong>Change Device:</strong> Use the floating frosted glass toolbar on the right side of the screen to switch between devices (iPhone 14, Pixel 7, iPad, etc.).</li>
            <li><strong>Rotate Screen:</strong> Click the rotate icon in the toolbar to test landscape mode.</li>
            <li><strong>Zoom:</strong> Use the zoom controls in the toolbar if you need to scale the device up or down to fit your monitor.</li>
          </ul>
        </section>

        <section className="how-to-use-section">
          <h2><span className="step-number">!</span> Important Troubleshooting</h2>
          <div className="how-to-use-alert">
            <p><strong>Is your preview zooming out like a desktop site?</strong></p>
            <p>Ensure your project's <code>index.html</code> includes the required mobile meta viewport tag in the <code>&lt;head&gt;</code>:</p>
            <br />
            <code>&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;</code>
          </div>
          
          <div className="how-to-use-alert" style={{ marginTop: '16px', borderLeftColor: 'var(--error)', background: 'var(--error-muted)' }}>
            <p><strong style={{ color: 'var(--error)' }}>Is your preview blocked or refusing to connect?</strong></p>
            <p>If you see a grey error screen, your framework might be blocking iframes for security reasons. Check if your backend or framework (like Next.js) is sending an <code>X-Frame-Options: DENY</code> header and disable it for local development.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
