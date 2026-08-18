import { useState } from 'react';
import './Header.css';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export function Header({ currentPage, onNavigate, theme, toggleTheme }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navbar (Visible on Android & Mobile Screens) */}
      <div className="mobile-header-bar">
        <button
          className="mobile-header-brand"
          onClick={() => handleNavClick('home')}
          aria-label="PremDevView Home"
        >
          <img src="/logo.png" alt="PremDevView Logo" className="mobile-header-logo" />
          <div className="mobile-header-titles">
            <span className="mobile-brand-name">PremDevView</span>
            <span className="mobile-brand-tagline">Mobile Previewer</span>
          </div>
        </button>

        <div className="mobile-header-actions">
          <button
            className="mobile-action-btn theme-quick-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
          </button>

          <button
            className={`mobile-action-btn hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-nav">
              <button
                className={`header-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick('home')}
              >
                Preview
              </button>
              <button
                className={`header-nav-link ${currentPage === 'how-to' ? 'active' : ''}`}
                onClick={() => handleNavClick('how-to')}
              >
                How to Use
              </button>
              <button
                className={`header-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick('about')}
              >
                About
              </button>
              <button
                className={`header-nav-link ${currentPage === 'about-developer' ? 'active' : ''}`}
                onClick={() => handleNavClick('about-developer')}
              >
                About Developer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar (Visible on > 768px) */}
      <header className="header desktop-header">
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
                <path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z" />
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
    </>
  );
}
