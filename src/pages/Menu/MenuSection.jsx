import React, { useState, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { MENU_DATA, CATEGORIES } from '../../data/menuData';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Search, Sparkles, Filter, Check, X, ArrowRight, ArrowLeft } from 'lucide-react';

export default function MenuSection({ isStandalonePage = false, onNavigate }) {
  const { activeCategory, setActiveCategory, dietFilter, setDietFilter, searchQuery, setSearchQuery } = useCart();
  const [localSearch, setLocalSearch] = useState('');

  // Combine global and local search
  const effectiveSearch = localSearch.trim() || searchQuery.trim();

  // Filter dishes based on Category, Diet (ALL | VEG | NON-VEG), and Search
  const filteredDishes = useMemo(() => {
    return MENU_DATA.filter(dish => {
      // 1. Category Filter
      if (activeCategory !== 'all' && dish.category !== activeCategory) {
        return false;
      }

      // 2. Diet Filter
      if (dietFilter === 'VEG' && !dish.isVeg) {
        return false;
      }
      if (dietFilter === 'NON-VEG' && dish.isVeg) {
        return false;
      }

      // 3. Search Query
      if (effectiveSearch) {
        const q = effectiveSearch.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(q);
        const matchesCat = dish.categoryName?.toLowerCase().includes(q);
        const matchesDesc = dish.description?.toLowerCase().includes(q);
        const matchesTag = dish.tags?.some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesCat && !matchesDesc && !matchesTag) {
          return false;
        }
      }

      return true;
    });
  }, [activeCategory, dietFilter, effectiveSearch]);

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <section
      id="menu"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-alt)',
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        ...(isStandalonePage ? { paddingTop: 'calc(var(--nav-height) + clamp(2rem, 4vw, 3.5rem))' } : {})
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb Navigation when rendered on dedicated page */}
        {isStandalonePage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid rgba(49, 10, 62, 0.12)'
            }}
          >
            <button
              type="button"
              onClick={() => onNavigate && onNavigate('home')}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent-orange)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: 0
              }}
            >
              <ArrowLeft size={16} />
              <span>← BACK TO HOME</span>
            </button>

            <span
              style={{
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-secondary)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              PAGE 02 // DEDICATED MENU CATALOG
            </span>
          </div>
        )}

        {/* Top Editorial Headline */}
        <div style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-orange)'
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.8rem',
                fontWeight: 800,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)'
              }}
            >
              COMPLETE RESTAURANT MENU • 57 VERIFIED RECIPES
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3.2rem, 8vw, 7.5rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 0.88,
                  margin: 0,
                  textTransform: 'uppercase'
                }}
              >
                EXPLORE<br />
                THE CRAVING.
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                  color: 'var(--text-secondary)',
                  marginTop: '12px'
                }}
              >
                Four categories. Endless reasons to come hungry.
              </p>
            </div>

            {/* Quick Search Bar Inside Menu Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid rgba(49, 10, 62, 0.2)',
                padding: '8px 18px',
                width: '100%',
                maxWidth: '360px',
                gap: '10px'
              }}
            >
              <Search size={18} color="var(--text-primary)" />
              <input
                type="text"
                value={localSearch}
                onChange={e => setLocalSearch(e.target.value)}
                placeholder="Search dishes or spices..."
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)'
                }}
              />
              {localSearch && (
                <button
                  type="button"
                  onClick={() => setLocalSearch('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-primary)',
                    display: 'flex'
                  }}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Category Navigation Pills (Horizontally Scrollable on Mobile) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '1.5rem',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
          className="category-scroll-bar"
        >
          {CATEGORIES.map(cat => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  padding: '10px 20px',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid',
                  borderColor: isSelected ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.18)',
                  backgroundColor: isSelected ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.55)',
                  color: isSelected ? '#FFF' : 'var(--text-primary)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.82rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={e => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                    e.currentTarget.style.borderColor = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={e => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.55)';
                    e.currentTarget.style.borderColor = 'rgba(49, 10, 62, 0.18)';
                  }
                }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    opacity: 0.85,
                    backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'rgba(49, 10, 62, 0.08)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Filter Bar: Veg / Non-Veg Toggles & Counter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.5rem',
            backgroundColor: 'rgba(241, 209, 233, 0.85)',
            borderRadius: '18px',
            border: '1px solid rgba(49, 10, 62, 0.15)',
            marginBottom: '2.5rem'
          }}
        >
          {/* Veg / Non-Veg Filters */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginRight: '6px'
              }}
            >
              FILTER:
            </span>

            {[
              { id: 'ALL', label: 'ALL DISHES' },
              { id: 'VEG', label: '100% VEG', isVeg: true },
              { id: 'NON-VEG', label: 'NON-VEG', isVeg: false }
            ].map(filter => {
              const isSelected = dietFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setDietFilter(filter.id)}
                  style={{
                    padding: '6px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.15)',
                    backgroundColor: isSelected ? 'var(--text-primary)' : 'rgba(255, 255, 255, 0.7)',
                    color: isSelected ? '#FFF' : 'var(--text-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {filter.id !== 'ALL' && (
                    <span className={`diet-indicator ${filter.isVeg ? 'veg' : 'non-veg'}`} style={{ width: '12px', height: '12px' }} />
                  )}
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>

          {/* Results Summary Counter */}
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
            Showing <strong style={{ color: 'var(--accent-orange)' }}>{filteredDishes.length}</strong> of{' '}
            <strong>{MENU_DATA.length}</strong> authentic dishes
            {activeCategory !== 'all' && ` in ${activeCategoryObj.name}`}
            {dietFilter !== 'ALL' && ` (${dietFilter})`}
          </div>
        </div>

        {/* Dishes Grid */}
        {filteredDishes.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '5rem 1rem',
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '24px',
              border: '1.5px dashed rgba(49, 10, 62, 0.2)'
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: '2rem',
                color: 'var(--text-primary)',
                marginBottom: '8px'
              }}
            >
              NO DISHES MATCH YOUR CURRENT FILTER
            </h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Try clearing your search query or switching from {dietFilter} to ALL DISHES.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('all');
                setDietFilter('ALL');
                setLocalSearch('');
                setSearchQuery('');
              }}
              className="btn-pill"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: 'clamp(1.25rem, 2.5vw, 2rem)'
            }}
          >
            {filteredDishes.map(dish => (
              <ProductCard key={dish.id} product={dish} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .category-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
