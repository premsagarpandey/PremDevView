import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { useTheme } from './hooks/useTheme';

type Page = 'home' | 'about';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme, toggleTheme } = useTheme();

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo(0, 0);
  }, []);

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
      </div>
    </div>
  );
}

export default App;
