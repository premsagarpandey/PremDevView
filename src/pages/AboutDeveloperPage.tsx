import './AboutDeveloperPage.css';

export function AboutDeveloperPage() {
  return (
    <main className="about-dev-page">
      <div className="about-dev-page-inner">
        <div>
          <h1 className="about-dev-page-title">About Developer</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px', marginTop: '6px' }}>
            Meet the developer behind PremDevView. Feel free to connect, collaborate, or reach out directly.
          </p>
        </div>

        {/* Developer Profile Card */}
        <div className="about-dev-card">
          <div className="about-dev-header">
            <span className="about-dev-badge">Creator & Developer</span>
            <h2 className="about-dev-name">Prem Sagar Pandey</h2>
            <p className="about-dev-role">
              Developer & Creator of <strong>PremDevView</strong>
            </p>
          </div>

          <div className="about-dev-links">
            {/* Email Pill Button */}
            <a
              href="mailto:premsagarpandey.cs@gmail.com"
              className="about-pill-btn"
              aria-label="Send email to Prem Sagar Pandey"
            >
              <span className="about-pill-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2.5" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </span>
              <span>premsagarpandey.cs@gmail.com</span>
            </a>

            {/* LinkedIn Pill Button */}
            <a
              href="https://www.linkedin.com/in/prem-sagar-pandey-2b0022382/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-pill-btn"
              aria-label="Connect with Prem Sagar Pandey on LinkedIn"
            >
              <span className="about-pill-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#0A66C2">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.96 0-1.74.78-1.74 1.74s.78 1.74 1.74 1.74 1.74-.78 1.74-1.74-.78-1.74-1.74-1.74Z"/>
                </svg>
              </span>
              <span>Connect on LinkedIn</span>
            </a>

            {/* Instagram Pill Button */}
            <a
              href="https://www.instagram.com/premsagar__1/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-pill-btn"
              aria-label="Follow Prem Sagar Pandey on Instagram"
            >
              <span className="about-pill-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad-dev)" strokeWidth="2.2"/>
                  <circle cx="12" cy="12" r="4.2" stroke="url(#ig-grad-dev)" strokeWidth="2.2"/>
                  <circle cx="17.5" cy="6.5" r="1.2" fill="url(#ig-grad-dev)"/>
                  <defs>
                    <linearGradient id="ig-grad-dev" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#FF8800"/>
                      <stop offset="0.5" stopColor="#FF0077"/>
                      <stop offset="1" stopColor="#9900FF"/>
                    </linearGradient>
                  </defs>
                </svg>
              </span>
              <span>Follow on Instagram</span>
            </a>

            {/* GitHub Pill Button */}
            <a
              href="https://github.com/premsagarpandey"
              target="_blank"
              rel="noopener noreferrer"
              className="about-pill-btn"
              aria-label="View Prem Sagar Pandey's GitHub Profile"
            >
              <span className="about-pill-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </span>
              <span>View GitHub Profile</span>
            </a>
          </div>
        </div>

        {/* Developer Mission Section */}
        <div className="about-dev-section">
          <h3>The Vision Behind PremDevView</h3>
          <p>
            As web developers, we frequently build websites and web applications locally on custom localhost ports. Testing responsive mobile layouts in standard desktop browser devtools often feels detached from reality and awkward to use. PremDevView was conceived and engineered by Prem Sagar Pandey to offer a lightweight, dedicated, zero-friction virtual mobile testing viewport that feels like holding a real phone in your hands.
          </p>
        </div>



        {/* Collaboration Callout */}
        <div className="about-dev-section" style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '16px' }}>Let's Connect & Build Together</h3>
          <p style={{ fontSize: '14px', marginTop: '6px' }}>
            Have feedback, feature suggestions for PremDevView, or exciting project opportunities? Reach out via email at <code>premsagarpandey.cs@gmail.com</code> or connect on LinkedIn and Instagram!
          </p>
        </div>
      </div>
    </main>
  );
}
