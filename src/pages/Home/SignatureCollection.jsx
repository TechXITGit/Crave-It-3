import React from 'react';
import { useCart } from '../../context/CartContext';
import { MENU_DATA } from '../../data/menuData';
import { Sparkles, ArrowRight, Plus } from 'lucide-react';

export default function SignatureCollection() {
  const { addToCart, openProductModal } = useCart();

  const signatureIds = [
    'mutton-seekh-roll',
    'tandoori-paneer-momos',
    'drums-of-heaven',
    'hakka-noodles'
  ];

  const signatures = signatureIds
    .map(id => MENU_DATA.find(d => d.id === id))
    .filter(Boolean);

  return (
    <section
      id="signatures"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-deep)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '750px',
            margin: '0 auto clamp(3rem, 6vw, 5rem)'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(49, 10, 62, 0.08)',
              padding: '6px 16px',
              borderRadius: 'var(--radius-pill)',
              marginBottom: '1rem'
            }}
          >
            <Sparkles size={14} color="var(--accent-orange)" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)'
              }}
            >
              SECTION 03 • EDITORIAL COLLECTION
            </span>
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              color: 'var(--text-primary)',
              lineHeight: 0.9,
              marginBottom: '1rem',
              textTransform: 'uppercase'
            }}
          >
            NOT JUST FOOD.<br />
            A WHOLE MOOD.
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6
            }}
          >
            High culinary fashion meets generational secret spices. Each dish is plated as an editorial
            masterpiece designed to spark cravings.
          </p>
        </div>

        {/* Dynamic Editorial Feature Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(2rem, 4vw, 3.5rem)' }}>
          {signatures.map((dish, index) => {
            const isReversed = index % 2 === 1;

            return (
              <div
                key={dish.id}
                onClick={() => openProductModal(dish)}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.65)',
                  backdropFilter: 'blur(12px)',
                  borderRadius: '32px',
                  border: '1.5px solid rgba(49, 10, 62, 0.18)',
                  padding: 'clamp(1.75rem, 4vw, 3.5rem)',
                  display: 'grid',
                  gridTemplateColumns: isReversed ? '1fr 1.2fr' : '1.2fr 1fr',
                  alignItems: 'center',
                  gap: 'clamp(1.5rem, 4vw, 4rem)',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className={`signature-row ${isReversed ? 'row-reversed' : ''}`}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#FFF';
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.boxShadow = '0 25px 60px rgba(49, 10, 62, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.65)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Content Side */}
                <div style={{ order: isReversed ? 2 : 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <span className={`diet-indicator ${dish.isVeg ? 'veg' : 'non-veg'}`} />
                    <span
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        color: 'var(--accent-orange)'
                      }}
                    >
                      EDITION 0{index + 1}
                    </span>
                    <span style={{ color: 'rgba(49, 10, 62, 0.3)' }}>•</span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--text-secondary)'
                      }}
                    >
                      {dish.categoryName}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                      color: 'var(--text-primary)',
                      lineHeight: 0.95,
                      marginBottom: '1rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {dish.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'clamp(0.92rem, 1.1vw, 1.05rem)',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6,
                      marginBottom: '1.75rem',
                      maxWidth: '480px'
                    }}
                  >
                    {dish.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '2.5rem',
                          fontWeight: 900,
                          color: 'var(--accent-orange)',
                          lineHeight: 1
                        }}
                      >
                        ₹{dish.price}
                      </span>
                      {dish.pieces && (
                        <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                          / {dish.pieces}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(dish);
                      }}
                      className="btn-accent"
                    >
                      <Plus size={16} strokeWidth={3} />
                      <span>ADD TO BAG</span>
                    </button>

                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--text-primary)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      VIEW RECIPE NOTES <ArrowRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Dramatic Food Cutout Stage */}
                <div
                  style={{
                    order: isReversed ? 1 : 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}
                >
                  <img
                    src={dish.image}
                    alt={dish.name}
                    loading="lazy"
                    style={{
                      maxWidth: '90%',
                      maxHeight: '320px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 20px 40px rgba(49, 10, 62, 0.25))',
                      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className="signature-image"
                    onError={e => {
                      e.target.src = '/images/food/chicken-drumstick.png';
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .signature-row {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .row-reversed > div {
            order: initial !important;
          }
        }
        .signature-row:hover .signature-image {
          transform: scale(1.08) rotate(-4deg);
        }
      `}</style>
    </section>
  );
}
