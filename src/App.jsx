import React, { useState, useEffect } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header/Header';
import SearchModal from './components/Header/SearchModal';
import HomePage from './pages/Home/HomePage';
import MenuSection from './pages/Menu/MenuSection';
import CombosSection from './pages/Combos/CombosSection';
import BrandStory from './pages/About/BrandStory';
import ContactSection from './pages/Contact/ContactSection';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/CartDrawer/CartDrawer';
import ProductModal from './components/ProductModal/ProductModal';
import Toast from './components/Toast/Toast';

function MainApp() {
  const { setActiveCategory } = useCart();

  // Helper to derive page ID from window.location.hash
  const getPageFromHash = () => {
    try {
      const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      if (['menu', 'combos', 'about', 'contact'].includes(hash)) {
        return hash;
      }
    } catch (e) {
      console.error(e);
    }
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  // Sync with browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const newPage = getPageFromHash();
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = pageId => {
    const targetPage = pageId === 'explore' ? 'menu' : pageId;
    setCurrentPage(targetPage);

    // Update browser URL hash cleanly
    if (targetPage === 'home') {
      window.history.pushState(null, '', window.location.pathname);
    } else {
      window.location.hash = `/${targetPage}`;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = catId => {
    setActiveCategory(catId);
    handleNavigate('menu');
  };

  return (
    <div className="crave-it-app" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Sticky Editorial Header */}
      <Header activeSection={currentPage} onNavigate={handleNavigate} />

      {/* Global Search Modal */}
      <SearchModal />

      {/* Dedicated Dynamic Page Router */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentPage === 'menu' && (
          <MenuSection
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'combos' && (
          <CombosSection
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'about' && (
          <BrandStory
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'contact' && (
          <ContactSection
            isStandalonePage={true}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Minimalist Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Interactive Overlays */}
      <CartDrawer />
      <ProductModal />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MainApp />
    </CartProvider>
  );
}
