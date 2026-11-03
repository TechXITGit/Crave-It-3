import React, { useState } from 'react';
import { SITE_CONFIG } from '../../data/siteContent';
import { CATEGORIES } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { ArrowUp, ArrowRight, Heart, Sparkles, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const { setActiveCategory } = useCart();
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = e => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryClick = catId => {
    setActiveCategory(catId);
    if (onNavigate) {
      onNavigate('menu');
    } else {
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: '#310A3E',
        color: '#FFF',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '3px solid var(--accent-orange)'
      }}
    >
      {/* Top Banner: Marquee Editorial Strip */}
      <div
        style={{
          backgroundColor: 'var(--accent-orange)',
          color: '#FFF',
          padding: '12px 0',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        <div
          style={{
            display: 'inline-block',
            animation: 'marqueeText 30s linear infinite',
            fontFamily: 'var(--font-anton)',
            fontSize: '1.15rem',
            letterSpacing: '0.12em'
          }}
        >
          {Array(8)
            .fill(
              'CRAVE TOMORROW • 57 AUTHENTIC RECIPES • HAND-TOSSED ROLLS • CRISPY MOMOS • LIVE WOK CHINESE • NOODLES & RICE • '
            )
            .join('')}
        </div>
      </div>

      <div className="container" style={{ paddingTop: 'clamp(4rem, 7vw, 6rem)', paddingBottom: '3rem' }}>
        {/* Main Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 0.9fr 1fr 1.3fr',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            marginBottom: 'clamp(3rem, 5vw, 4.5rem)'
          }}
          className="footer-grid"
        >
          {/* Col 1: Brand & Philosophy */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: '2.4rem',
                  lineHeight: 1,
                  letterSpacing: '0.04em'
                }}
              >
                CRAVE<span style={{ color: 'var(--accent-orange)' }}>IT</span>
              </span>
             
            </div>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.92rem',
                color: 'rgba(255, 255, 255, 0.72)',
                lineHeight: 1.65,
                maxWidth: '340px',
                marginBottom: '1.5rem'
              }}
            >
              Fashion editorial energy fused with artisanal street gastronomy. 57 authentic recipes across
              Rolls, Momos, Chinese, and Rice & Noodles.
            </p>

            
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: '1.2rem',
                letterSpacing: '0.06em',
                color: 'var(--accent-orange)',
                marginBottom: '1.25rem'
              }}
            >
              EXPLORE
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {SITE_CONFIG.navLinks.map(link => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={e => {
                      e.preventDefault();
                      if (onNavigate) {
                        onNavigate(link.id);
                      }
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.88rem',
                      fontWeight: 600,
                      color: 'rgba(255, 255, 255, 0.75)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-orange)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: The 4 Signature Categories */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: '1.2rem',
                letterSpacing: '0.06em',
                color: 'var(--accent-orange)',
                marginBottom: '1.25rem'
              }}
            >
              THE 4 CATEGORIES
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryClick(cat.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.75)',
                    cursor: 'pointer',
                    padding: '3px 0',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--accent-orange)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)')}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Col 4: Newsletter & Contact Snippet */}
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: '1.2rem',
                letterSpacing: '0.06em',
                color: 'var(--accent-orange)',
                marginBottom: '1.25rem'
              }}
            >
              CRAVE GAZETTE
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.5, marginBottom: '1rem' }}>
              Get secret chef drops, flash tasting invitations, and exclusive editorial dining codes.
            </p>

            {subscribed ? (
              <div
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid #22C55E',
                  borderRadius: '12px',
                  padding: '12px',
                  color: '#22C55E',
                  fontSize: '0.85rem',
                  fontWeight: 700
                }}
              >
                ✓ You're on the Crave IT VIP list!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', marginBottom: '1.5rem' }}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: '#FFF',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    backgroundColor: 'var(--accent-orange)',
                    border: 'none',
                    color: '#FFF',
                    borderRadius: 'var(--radius-pill)',
                    padding: '10px 18px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  aria-label="Subscribe"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.65)' }}>
              <span>📍 LDA Colony, Sector G, Lucknow</span>
              <span>📞 {SITE_CONFIG.contact.phone}</span>
              <span>✉️ {SITE_CONFIG.contact.email}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Scroll to Top */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            fontSize: '0.8rem',
            color: 'rgba(255, 255, 255, 0.55)'
          }}
        >
          <div>
            © {new Date().getFullYear()} CRAVE IT • {SITE_CONFIG.contact.restaurantName}. All rights reserved.
            Futuristic Neon Food Editorial Concept 03.
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#FFF',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 14px',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = 'var(--accent-orange)';
              e.currentTarget.style.borderColor = 'var(--accent-orange)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }}
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes marqueeText {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 580px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
