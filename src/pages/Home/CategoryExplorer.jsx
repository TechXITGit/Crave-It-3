import React from 'react';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/menuData';
import { ArrowUpRight } from 'lucide-react';

export default function CategoryExplorer({ onSelectCategory }) {
  const { setActiveCategory } = useCart();

  // Filter out 'all' to get the 4 core culinary categories
  const coreCategories = CATEGORIES.filter(c => c.id !== 'all');

  const handleTileClick = catId => {
    setActiveCategory(catId);
    if (onSelectCategory) {
      onSelectCategory(catId);
    } else {
      const menuSection = document.getElementById('menu');
      if (menuSection) {
        menuSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section
      id="categories"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: 'clamp(2.5rem, 5vw, 4rem)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
              SECTION 02 • THE 4 SIGNATURE CORRIDORS
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.8rem, 6.5vw, 5.5rem)',
                color: 'var(--text-primary)',
                lineHeight: 0.92,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              WHAT ARE WE<br />
              CRAVING TODAY?
            </h2>

            <p
              style={{
                maxWidth: '380px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}
            >
              Select any corridor to filter our live kitchen menu. 57 authentic recipes,
              flame-crafted to order.
            </p>
          </div>
        </div>

        {/* 8 Interactive Category Tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 'clamp(1rem, 2vw, 1.75rem)'
          }}
        >
          {coreCategories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleTileClick(cat.id)}
              style={{
                backgroundColor: 'rgba(241, 209, 233, 0.65)',
                borderRadius: '24px',
                border: '1.5px solid rgba(49, 10, 62, 0.16)',
                padding: '1.75rem 1.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '290px',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              className="category-tile"
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#FFF';
                e.currentTarget.style.borderColor = 'var(--text-primary)';
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(49, 10, 62, 0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'rgba(241, 209, 233, 0.65)';
                e.currentTarget.style.borderColor = 'rgba(49, 10, 62, 0.16)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Top: Category Index & Dish Count */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  zIndex: 2
                }}
              >
                <span
                  style={{
                    fontFamily: 'monospace',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--accent-orange)'
                  }}
                >
                  0{idx + 1}
                </span>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    backgroundColor: 'rgba(49, 10, 62, 0.08)',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {cat.count} DISHES
                </span>
              </div>

              {/* Center: Large Floating Food Cutout */}
              <div
                style={{
                  position: 'relative',
                  height: '135px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '8px 0',
                  zIndex: 2
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 12px 20px rgba(49, 10, 62, 0.2))',
                    transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  className="cat-tile-image"
                  onError={e => {
                    e.target.src = '/images/food/chicken-drumstick.png';
                  }}
                />
              </div>

              {/* Bottom: Name, Tagline & Explore Arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                  zIndex: 2,
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(49, 10, 62, 0.1)'
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-anton)',
                      fontSize: '1.6rem',
                      color: 'var(--text-primary)',
                      lineHeight: 1,
                      letterSpacing: '0.03em',
                      marginBottom: '4px'
                    }}
                  >
                    {cat.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.35
                    }}
                  >
                    {cat.tagline}
                  </p>
                </div>

                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    border: '1.5px solid var(--text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--text-primary)',
                    flexShrink: 0,
                    transition: 'all 0.2s ease'
                  }}
                  className="cat-arrow-btn"
                >
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .category-tile:hover .cat-tile-image {
          transform: scale(1.15) rotate(6deg);
        }
        .category-tile:hover .cat-arrow-btn {
          background-color: var(--accent-orange);
          border-color: var(--accent-orange);
          color: #FFF;
          transform: rotate(45deg);
        }
      `}</style>
    </section>
  );
}
