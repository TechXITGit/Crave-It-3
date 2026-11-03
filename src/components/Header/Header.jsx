import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { SITE_CONFIG } from '../../data/siteContent';
import { Search, ShoppingBag, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ activeSection, onNavigate }) {
  const { cartCount, openCart, setIsSearchOpen, isSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    const handleResize = () => {
      if (window.innerWidth > 860) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLinkClick = (e, sectionId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <style>{`
        .mobile-menu-trigger {
          display: none !important;
        }
        .desktop-nav {
          display: flex !important;
        }
        @media (max-width: 860px) {
          .mobile-menu-trigger {
            display: flex !important;
          }
          .desktop-nav {
            display: none !important;
          }
        }
      `}</style>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          backgroundColor: isScrolled
            ? 'rgba(220, 164, 216, 0.94)'
            : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
          borderBottom: isScrolled
            ? '1px solid rgba(49, 10, 62, 0.1)'
            : '1px solid transparent'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}
        >
          {/* Left: 3-line editorial menu trigger (Mobile only) & CRAVE IT typographic logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-trigger"
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '5px',
                padding: '6px',
                width: '32px',
                height: '32px'
              }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} color="var(--text-primary)" />
              ) : (
                <>
                  <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }} />
                  <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }} />
                  <span style={{ display: 'block', width: '16px', height: '2px', backgroundColor: 'var(--text-primary)', borderRadius: '1px' }} />
                </>
              )}
            </button>

            <a
              href="#/"
              onClick={e => handleLinkClick(e, 'home')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: 'var(--text-primary)'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  letterSpacing: '0.06em',
                  color: 'var(--text-primary)'
                }}
              >
                CRAVE<span style={{ color: 'var(--accent-orange)' }}>IT</span>
              </span>
            </a>
          </div>

          {/* Center: Desktop Editorial Nav Links */}
          <nav className="desktop-nav" style={{ alignItems: 'center', gap: '2.5rem' }}>
            {SITE_CONFIG.navLinks.map(link => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={e => handleLinkClick(e, link.id)}
                  style={{
                    position: 'relative',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.16em',
                    textDecoration: 'none',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    padding: '6px 0',
                    transition: 'color var(--transition-fast)'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-orange)')}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)';
                  }}
                >
                  {link.label}
                  {/* Active Indicator Underline */}
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: isActive ? '100%' : '0%',
                      height: '2px',
                      backgroundColor: 'var(--text-primary)',
                      transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Search & Shopping Bag Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                transition: 'transform 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label="Search menu"
              title="Search (⌘K)"
            >
              <Search size={21} strokeWidth={2.2} />
            </button>

            <button
              onClick={openCart}
              style={{
                position: 'relative',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '6px',
                transition: 'transform 0.15s'
              }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.1)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
              aria-label={`Shopping bag with ${cartCount} items`}
            >
              <ShoppingBag size={21} strokeWidth={2.2} />
              {cartCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-2px',
                    right: '-4px',
                    backgroundColor: 'var(--accent-orange)',
                    color: '#FFF',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 6px rgba(255, 100, 30, 0.5)'
                  }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 'var(--nav-height)',
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(220, 164, 216, 0.98)',
            backdropFilter: 'blur(20px)',
            zIndex: 999,
            padding: '2.5rem 1.75rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(49, 10, 62, 0.1)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {SITE_CONFIG.navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={e => handleLinkClick(e, link.id)}
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: '2.2rem',
                  letterSpacing: '0.04em',
                  textDecoration: 'none',
                  color: activeSection === link.id ? 'var(--accent-orange)' : 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '10px',
                  borderBottom: '1px solid rgba(49, 10, 62, 0.1)'
                }}
              >
                <span>{link.label}</span>
                <ArrowUpRight size={22} color="var(--accent-orange)" />
              </a>
            ))}
          </div>

          <div
            style={{
              paddingTop: '2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}
          >
            <p><strong>{SITE_CONFIG.contact.restaurantName}</strong></p>
            <p>{SITE_CONFIG.contact.address}</p>
            <p>Hours: {SITE_CONFIG.contact.openingHours}</p>
          </div>
        </div>
      )}
    </>
  );
}
