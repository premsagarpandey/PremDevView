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

      <div className="header-footer" style={{ padding: '16px', marginTop: 'auto' }}>
        <button
          className="header-nav-link theme-toggle-btn"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <span>{theme === 'light' ? '🌙' : '☀️'}</span>
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </header>
  );
}
