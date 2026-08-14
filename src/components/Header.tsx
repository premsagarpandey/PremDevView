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
        <button
          className="header-brand"
          onClick={() => onNavigate('home')}
          aria-label="PremDevView Home"
        >
          <span className="header-logo">📱</span>
          <span className="header-title">PremDevView</span>
        </button>

        <nav className="header-nav" aria-label="Main navigation">
          <button
            className={`header-nav-link ${currentPage === 'home' ? 'active' : ''}`}
            onClick={() => onNavigate('home')}
          >
            Preview
          </button>
          <button
            className={`header-nav-link ${currentPage === 'about' ? 'active' : ''}`}
            onClick={() => onNavigate('about')}
          >
            About
          </button>
          <a
            className="header-nav-link"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub repository (coming soon)"
          >
            GitHub
          </a>
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
