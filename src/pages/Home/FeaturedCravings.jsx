import React from 'react';
import { useCart } from '../../context/CartContext';
import { MENU_DATA } from '../../data/menuData';
import { ArrowRight, Plus, Sparkles, Flame } from 'lucide-react';

export default function FeaturedCravings({ onExploreMenu }) {
  const { addToCart, openProductModal } = useCart();

  // Pick 4 standout signature dishes from 4 allowed categories
  const featuredIds = [
    'chicken-kathi-roll',
    'crispy-chicken-momos',
    'chicken-lollipop',
    'chicken-fried-rice'
  ];

  const featuredItems = featuredIds
    .map(id => MENU_DATA.find(item => item.id === id))
    .filter(Boolean);

  return (
    <section
      id="featured"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-alt)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Editorial Section Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)'
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
              SECTION 01 • CURATED SELECTIONS
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
              THE ART OF A<br />
              GOOD CRAVING.
            </h2>

            <p
              style={{
                maxWidth: '420px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.98rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}
            >
              Four iconic culinary pillars of CRAVE IT. Charcoal-fired, slow-simmered, and wok-charred
              with uncompromised craftsmanship.
            </p>
          </div>
        </div>

        {/* Asymmetrical Editorial Grid (Not repetitive white cards) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: 'clamp(1rem, 2vw, 2rem)'
          }}
          className="featured-asym-grid"
        >
          {featuredItems.map((item, idx) => {
            // Asymmetric column spans: 1st is 7 cols, 2nd is 5 cols, 3rd is 5 cols, 4th is 7 cols
            const isLarge = idx === 0 || idx === 3;
            const colSpan = isLarge ? 'span 7' : 'span 5';

            return (
              <div
                key={item.id}
                onClick={() => openProductModal(item)}
                style={{
                  gridColumn: colSpan,
                  backgroundColor: 'rgba(241, 209, 233, 0.7)',
                  borderRadius: '28px',
                  border: '1.5px solid rgba(49, 10, 62, 0.2)',
                  padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                  display: 'flex',
                  flexDirection: isLarge ? 'row' : 'column',
                  alignItems: isLarge ? 'center' : 'flex-start',
                  justifyContent: 'space-between',
                  gap: '1.5rem',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="featured-item-box"
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#FFF';
                  e.currentTarget.style.borderColor = 'var(--text-primary)';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(49, 10, 62, 0.15)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(241, 209, 233, 0.7)';
                  e.currentTarget.style.borderColor = 'rgba(49, 10, 62, 0.2)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Content Column */}
                <div style={{ flex: 1, zIndex: 2 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} />
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {item.categoryName}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 0.95,
                      marginBottom: '10px',
                      textTransform: 'uppercase'
                    }}
                  >
                    {item.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                      marginBottom: '1.25rem',
                      maxWidth: '380px'
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2rem',
                        fontWeight: 900,
                        color: 'var(--accent-orange)'
                      }}
                    >
                      ₹{item.price}
                    </span>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(item);
                      }}
                      className="btn-accent"
                      style={{
                        padding: '8px 18px',
                        fontSize: '0.78rem'
                      }}
                    >
                      <Plus size={14} strokeWidth={3} />
                      <span>QUICK ADD</span>
                    </button>
                  </div>
                </div>

                {/* Transparent Food Cutout Stage */}
                <div
                  style={{
                    position: 'relative',
                    width: isLarge ? '240px' : '100%',
                    height: '210px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 15px 25px rgba(49, 10, 62, 0.2))',
                      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="featured-image"
                    onError={e => {
                      e.target.src = '/images/food/chicken-drumstick.png';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button to Dedicated Menu Page */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <button
            type="button"
            onClick={() => onExploreMenu && onExploreMenu()}
            className="btn-accent"
            style={{
              padding: '1.1rem 2.8rem',
              fontSize: '0.95rem',
              boxShadow: '0 14px 35px rgba(255, 100, 30, 0.4)'
            }}
          >
            <span>EXPLORE COMPLETE 57-DISH MENU</span>
            <ArrowRight size={18} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .featured-asym-grid > div {
            grid-column: span 12 !important;
            flex-direction: column !important;
          }
        }
        .featured-item-box:hover .featured-image {
          transform: scale(1.1) rotate(5deg);
        }
      `}</style>
    </section>
  );
}
