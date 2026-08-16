import './HowToUsePage.css';

export function HowToUsePage() {
  return (
    <main className="how-to-use">
      <div className="how-to-use-inner">
        <div>
          <h1 className="how-to-use-title">How to use PremDevView</h1>
          <p style={{ color: 'var(--text-secondary)' }}>A step-by-step guide to testing your localhost projects.</p>
        </div>

        <section className="how-to-use-section">
          <h2><span className="step-number">1</span> Open the Website</h2>
          <p>
            First, open PremDevView in your browser. Ensure that the local development server for your own project is already running in the background (e.g., using <code>npm run dev</code> or <code>npm start</code>).
          </p>
        </section>

        <section className="how-to-use-section">
          <h2><span className="step-number">2</span> Enter your Localhost Link</h2>
          <p>
            Navigate to the <strong>Preview</strong> tab where you will see a virtual phone screen.
          </p>
          <ul>
            <li>Click on the URL input bar located at the top of the phone frame.</li>
            <li>Type in your running localhost URL (for example, <code>http://localhost:5173</code> or <code>http://localhost:3000</code>).</li>
            <li>Press Enter to load your local website into the phone preview.</li>
          </ul>
        </section>

        <section className="how-to-use-section">
          <h2><span className="step-number">3</span> Preview your Website</h2>
          <p>
            Once loaded, you can preview exactly how your website looks and functions on a mobile device.
          </p>
          <ul>
            <li><strong>Change Devices:</strong> Use the right-side toolbar to switch between different phone and tablet sizes.</li>
            <li><strong>Rotate:</strong> Click the rotate icon to see how your site looks in landscape mode.</li>
            <li><strong>Interact:</strong> Scroll, click, and interact with your website just like a real mobile user would.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
