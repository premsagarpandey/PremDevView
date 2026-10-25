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
      {/* Mobile Top Navbar */}
      <div className="mobile-header-bar">
        <a
          href="/"
          className="mobile-header-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          aria-label="PremDevView Home"
        >
          <img src="/logo.png" alt="PremDevView" className="mobile-header-logo" />
          <div className="mobile-header-titles">
            <span className="mobile-brand-name">PremDevView</span>
            <span className="mobile-brand-tagline">Localhost Mobile Preview</span>
          </div>
        </a>

        <div className="mobile-header-actions">
          <button
            type="button"
            className="mobile-action-btn theme-quick-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            title={theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          >
            {theme === 'light' ? (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
            type="button"
            className={`mobile-action-btn hamburger-btn ${mobileMenuOpen ? 'open' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-nav">
              <a
                href="/"
                className={`header-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('home');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                  <path d="M12 18h.01" />
                </svg>
                <span>Preview</span>
              </a>
              <a
                href="/how-to"
                className={`header-nav-link ${currentPage === 'how-to' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('how-to');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                </svg>
                <span>How to Use</span>
              </a>
              <a
                href="/about"
                className={`header-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <span>About</span>
              </a>
              <a
                href="/about-developer"
                className={`header-nav-link ${currentPage === 'about-developer' ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('about-developer');
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>About Developer</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <header className="header desktop-header">
        <div className="header-inner">
          <a
            href="/"
            className="header-brand"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('home');
            }}
            aria-label="PremDevView Home"
          >
            <img src="/logo.png" alt="PremDevView" className="header-logo" />
            <div className="header-brand-info">
              <span className="header-brand-title">PremDevView</span>
              <span className="header-brand-sub">Localhost Mobile Preview</span>
            </div>
          </a>

          <nav className="header-nav" aria-label="Main navigation">
            <a
              href="/"
              className={`header-nav-link ${currentPage === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('home');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span>Preview</span>
            </a>
            <a
              href="/how-to"
              className={`header-nav-link ${currentPage === 'how-to' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('how-to');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span>How to Use</span>
            </a>
            <a
              href="/about"
              className={`header-nav-link ${currentPage === 'about' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <span>About</span>
            </a>
            <a
              href="/about-developer"
              className={`header-nav-link ${currentPage === 'about-developer' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('about-developer');
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              <span>About Developer</span>
            </a>
          </nav>
        </div>

        <div className="header-footer">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0 9 9 9 0 1 1-9-9Z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
