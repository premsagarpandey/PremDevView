import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { HowToUsePage } from './pages/HowToUsePage';
import { AboutDeveloperPage } from './pages/AboutDeveloperPage';
import { useTheme } from './hooks/useTheme';

export type Page = 'home' | 'about' | 'how-to' | 'about-developer';

const pathToPage: Record<string, Page> = {
  '/': 'home',
  '/home': 'home',
  '/how-to': 'how-to',
  '/how-to-use': 'how-to',
  '/about': 'about',
  '/about-developer': 'about-developer',
};

const pageToPath: Record<Page, string> = {
  home: '/',
  'how-to': '/how-to',
  about: '/about',
  'about-developer': '/about-developer',
};

const pageTitles: Record<Page, string> = {
  home: 'Prem Dev View — Local Host Mobile Preview | PremDevView by Prem Sagar Pandey',
  'how-to': 'How to Use Prem Dev View — Local Host Mobile Preview Tutorial',
  about: 'About Prem Dev View (PremDevView) — Local Host Mobile Previewer',
  'about-developer': 'About Prem Sagar Pandey — Creator of Prem Dev View (PremDevView)',
};

const pageDescriptions: Record<Page, string> = {
  home: 'Prem Dev View (also known as premdev view / premdevview) by Prem Sagar Pandey is the free developer tool for local host mobile preview and localhost website testing in an authentic virtual smartphone screen.',
  'how-to': 'Learn how to get a local host mobile preview for localhost:3000, localhost:5173, and un-deployed web applications using Prem Dev View by Prem Sagar Pandey.',
  about: 'Prem Dev View (PremDevView) is a lightweight developer tool created by Prem Sagar Pandey to preview local host and un-deployed websites in an authentic virtual phone screen.',
  'about-developer': 'Prem Sagar Pandey is a Full Stack Developer and creator of Prem Dev View (PremDevView), the free local host mobile preview tool. Connect on LinkedIn, GitHub, and Instagram.',
};

function getInitialPage(): Page {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
  return pathToPage[path] || 'home';
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>(getInitialPage);
  const { theme, toggleTheme } = useTheme();

  const syncMeta = useCallback((page: Page) => {
    document.title = pageTitles[page] || pageTitles.home;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', pageDescriptions[page] || pageDescriptions.home);
    }
  }, []);

  const handleNavigate = useCallback((page: string) => {
    const targetPage = (pathToPage[page] || page) as Page;
    setCurrentPage(targetPage);
    const targetPath = pageToPath[targetPage] || '/';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page: targetPage }, '', targetPath);
    }
    syncMeta(targetPage);
    window.scrollTo(0, 0);
  }, [syncMeta]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase().replace(/\/$/, '') || '/';
      const matchedPage = pathToPage[path] || 'home';
      setCurrentPage(matchedPage);
      syncMeta(matchedPage);
    };

    window.addEventListener('popstate', handlePopState);
    syncMeta(currentPage);

    return () => window.removeEventListener('popstate', handlePopState);
  }, [currentPage, syncMeta]);

  return (
    <div className="app-layout">
      <Header 
        currentPage={currentPage} 
        onNavigate={handleNavigate} 
        theme={theme}
        toggleTheme={toggleTheme}
      />
      <div className="app-content">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'how-to' && <HowToUsePage />}
        {currentPage === 'about-developer' && <AboutDeveloperPage />}
      </div>
    </div>
  );
}

export default App;

