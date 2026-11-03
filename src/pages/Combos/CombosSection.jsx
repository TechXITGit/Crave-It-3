import React from 'react';
import { useCart } from '../../context/CartContext';
import { SITE_CONFIG } from '../../data/siteContent';
import { Sparkles, Plus, Clock, Tag, ShieldCheck, Flame, ArrowLeft } from 'lucide-react';

export default function CombosSection({ isStandalonePage = false, onNavigate }) {
  const { addToCart } = useCart();

  const handleAddCombo = combo => {
    // Treat combo as an authentic menu item for the shopping bag
    const comboItem = {
      id: combo.id,
      name: combo.name,
      category: 'combos',
      categoryName: 'Signature Combos',
      isVeg: false,
      price: combo.specialPrice || combo.price,
      image: combo.image,
      pieces: combo.serves || '1 Combo',
      description: combo.description
    };
    addToCart(comboItem, 1, false);
  };

  return (
    <section
      id="combos"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        minHeight: isStandalonePage ? '100vh' : 'auto',
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
              PAGE 03 // COMBOS & PLATTERS
            </span>
          </div>
        )}
        {/* Section Header */}
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
              SECTION 04 • CURATED COMBINATIONS
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
              MORE FOOD.<br />
              LESS THINKING.
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
              Authentic pairing verified from the restaurant menu. Real dum basmati paired with chilled
              refreshment, plus chef tasting combinations in calibration.
            </p>
          </div>
        </div>

        {/* Combo Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)'
          }}
        >
          {/* 1. Verified Live Combo Card from Reference Website */}
          {SITE_CONFIG.combos.map(combo => (
            <div
              key={combo.id}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(16px)',
                borderRadius: '32px',
                border: '2px solid var(--text-primary)',
                boxShadow: '0 20px 50px rgba(49, 10, 62, 0.15)',
                padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                overflow: 'hidden'
              }}
              className="editorial-card"
            >
              {/* Promo Badge */}
              <div
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  backgroundColor: 'var(--accent-orange)',
                  color: '#FFF',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-pill)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  boxShadow: '0 6px 16px rgba(255, 100, 30, 0.4)'
                }}
              >
                <Tag size={12} />
                <span>{combo.badge}</span>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShieldCheck size={16} color="#15803D" />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: '#15803D',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase'
                    }}
                  >
                    Verified Live Deal • {combo.specialOfferDays}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 3.2vw, 2.7rem)',
                    color: 'var(--text-primary)',
                    lineHeight: 1,
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                  }}
                >
                  {combo.name}
                </h3>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.55,
                    marginBottom: '1.5rem'
                  }}
                >
                  {combo.description}
                </p>

                {/* Food Image Stage */}
                <div
                  style={{
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '1rem 0',
                    position: 'relative'
                  }}
                >
                  <img
                    src={combo.image}
                    alt={combo.name}
                    style={{
                      maxHeight: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 16px 30px rgba(49, 10, 62, 0.22))'
                    }}
                    onError={e => {
                      e.target.src = '/images/food/chicken-drumstick.png';
                    }}
                  />
                </div>
              </div>

              {/* Bottom Price & Add CTA */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1.5px solid rgba(49, 10, 62, 0.15)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.4rem',
                        fontWeight: 900,
                        color: 'var(--accent-orange)',
                        lineHeight: 1
                      }}
                    >
                      ₹{combo.specialPrice}
                    </span>
                    <span
                      style={{
                        fontSize: '1rem',
                        color: 'var(--text-subtle)',
                        textDecoration: 'line-through',
                        fontWeight: 600
                      }}
                    >
                      ₹{combo.originalPrice}
                    </span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    Special promotional price on Mon & Thu (Standard ₹{combo.originalPrice})
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleAddCombo(combo)}
                  className="btn-accent"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.82rem'
                  }}
                >
                  <Plus size={15} strokeWidth={3} />
                  <span>ADD COMBO</span>
                </button>
              </div>
            </div>
          ))}

          {/* 2. Visual But Strictly Unconfigured Upcoming Combos Section (Adhering to Section D rule) */}
          <div
            style={{
              backgroundColor: 'rgba(241, 209, 233, 0.45)',
              borderRadius: '32px',
              border: '2px dashed rgba(49, 10, 62, 0.25)',
              padding: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: 'rgba(49, 10, 62, 0.1)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-pill)',
                  marginBottom: '1rem'
                }}
              >
                <Clock size={13} color="var(--text-secondary)" />
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)'
                  }}
                >
                  SEASONAL COMBOS • IN CALIBRATION
                </span>
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  textTransform: 'uppercase',
                  marginBottom: '8px'
                }}
              >
                CHEF TASTING PLATTERS
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.55,
                  marginBottom: '1.5rem'
                }}
              >
                Our culinary team is currently curating pairing combinations (Chicken Kathi Roll + Steamed Momos Box,
                and Chilli Chicken + Hakka Noodles Platter). In accordance with our culinary policy, combo prices are calibrated strictly
                to fresh daily kitchen ingredients before being unlocked.
              </p>

              <div
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  padding: '16px',
                  borderRadius: '16px',
                  border: '1px solid rgba(49, 10, 62, 0.12)',
                  fontSize: '0.82rem',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={15} color="var(--accent-orange)" />
                  <span>Rolls & Momos Duo (Price coming soon)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Flame size={15} color="var(--accent-orange)" />
                  <span>Momos & Wok Box (Price coming soon)</span>
                </div>
              </div>
            </div>

            <div
              style={{
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px dashed rgba(49, 10, 62, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)'
                }}
              >
                STATUS: UNCONFIGURED
              </span>

              <button
                type="button"
                disabled
                style={{
                  backgroundColor: 'rgba(49, 10, 62, 0.15)',
                  color: 'rgba(49, 10, 62, 0.5)',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '10px 18px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'not-allowed'
                }}
              >
                COMING SOON
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
