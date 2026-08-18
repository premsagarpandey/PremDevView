import './Header.css';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ currentPage, onNavigate, theme, toggleTheme }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <button
            className="header-brand"
            onClick={() => onNavigate('home')}
            aria-label="PremDevView Home"
            style={{ paddingBottom: 0 }}
          >
            <img src="/logo.png" alt="PremDevView Logo" className="header-logo" />
          </button>
          <p style={{ fontSize: '19px', color: 'var(--text-primary)', textAlign: 'center', margin: 0, padding: '0 12px', lineHeight: '1.3', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Preview your localhost or<br />
            un-deployed website
          </p>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          <button
            className={`header-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Preview
          </button>
          <button
            className={`header-nav-link ${currentPage === 'how-to' ? 'active' : ''}`}
            onClick={() => onNavigate('how-to')}
          >
            How to Use
          </button>
          <button
            className={`header-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
          <button
            className={`header-nav-link ${currentPage === 'about-developer' ? 'active' : ''}`}
            onClick={() => onNavigate('about-developer')}
          >
            About Developer
          </button>
        </nav>
      </div>

      <div className="header-footer">
        <button
          className="header-nav-link theme-toggle-btn"
          onClick={toggleTheme}
          aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <svg
              className="theme-toggle-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          ) : (
            <svg
              className="theme-toggle-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          )}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </header>
  );
}
