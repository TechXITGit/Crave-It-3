import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { MENU_DATA } from '../../data/menuData';
import { Search, X, ArrowRight, Plus } from 'lucide-react';

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, openProductModal, addToCart } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredDishes = query.trim()
    ? MENU_DATA.filter(dish =>
        dish.name.toLowerCase().includes(query.toLowerCase()) ||
        dish.categoryName?.toLowerCase().includes(query.toLowerCase()) ||
        dish.description?.toLowerCase().includes(query.toLowerCase()) ||
        dish.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 10)
    : MENU_DATA.filter(dish => dish.featured).slice(0, 6);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(49, 10, 62, 0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(3rem, 10vh, 7rem)',
        paddingLeft: '1.25rem',
        paddingRight: '1.25rem',
        animation: 'fadeInModal 0.2s ease-out'
      }}
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          backgroundColor: '#E8B8E2',
          borderRadius: '20px',
          boxShadow: '0 25px 60px rgba(49, 10, 62, 0.45)',
          border: '2px solid #310A3E',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
          animation: 'scaleUpModal 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1.5px solid rgba(49, 10, 62, 0.15)',
            gap: '12px',
            backgroundColor: '#F1D1E9'
          }}
        >
          <Search size={22} color="#310A3E" strokeWidth={2.4} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search all 57 dishes (e.g. kathi roll, momos, chilli chicken, noodles)..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#310A3E'
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#310A3E',
                padding: '4px'
              }}
            >
              <X size={18} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            style={{
              background: '#310A3E',
              color: '#FFF',
              border: 'none',
              borderRadius: '50%',
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              marginLeft: '6px'
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Results Header */}
        <div
          style={{
            padding: '0.75rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontFamily: 'var(--font-body)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#542452',
            backgroundColor: 'rgba(241, 209, 233, 0.5)'
          }}
        >
          <span>{query.trim() ? `Search Matches (${filteredDishes.length})` : 'Editorial Picks'}</span>
          <span>57 Total Authenticated Dishes</span>
        </div>

        {/* Results List */}
        <div
          style={{
            overflowY: 'auto',
            padding: '0.75rem 1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {filteredDishes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#542452' }}>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem' }}>NO MATCHES FOUND</p>
              <p style={{ fontSize: '0.9rem', marginTop: '4px' }}>Try searching for "Rolls", "Momos", "Chilli", or "Noodles".</p>
            </div>
          ) : (
            filteredDishes.map(dish => (
              <div
                key={dish.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '1px solid rgba(49, 10, 62, 0.1)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onClick={() => {
                  setIsSearchOpen(false);
                  openProductModal(dish);
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#FFF';
                  e.currentTarget.style.transform = 'translateX(4px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.transform = 'translateX(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={dish.image}
                    alt={dish.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(220, 164, 216, 0.3)'
                    }}
                    onError={e => {
                      e.target.src = '/images/food/chicken-drumstick.png';
                    }}
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`diet-indicator ${dish.isVeg ? 'veg' : 'non-veg'}`} />
                      <h4
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.92rem',
                          fontWeight: 700,
                          color: '#310A3E'
                        }}
                      >
                        {dish.name}
                      </h4>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: '#542452', textTransform: 'capitalize' }}>
                      {dish.categoryName || dish.category} • {dish.pieces || 'Standard Portion'}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      color: '#FF641E',
                      fontWeight: 700
                    }}
                  >
                    ₹{dish.price}
                  </span>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      addToCart(dish);
                    }}
                    style={{
                      backgroundColor: '#310A3E',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'transform 0.15s'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF641E')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#310A3E')}
                    title="Quick add to bag"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeInModal {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpModal {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
