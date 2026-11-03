import React from 'react';
import { SITE_CONFIG } from '../../data/siteContent';
import { Sparkles, UtensilsCrossed, Flame, Clock, ArrowLeft } from 'lucide-react';

export default function BrandStory({ isStandalonePage = false, onNavigate }) {
  const { brandStory } = SITE_CONFIG;

  return (
    <section
      id="about"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-alt)',
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
              PAGE 04 // OUR STORY & ROOTS
            </span>
          </div>
        )}
        {/* Section Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
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
            SECTION 05 • OUR MANIFESTO
          </span>
        </div>

        {/* Big Editorial Headline */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4.5rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7.5vw, 7rem)',
              color: 'var(--text-primary)',
              lineHeight: 0.9,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            {brandStory.heading}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              color: 'var(--text-secondary)',
              marginTop: '1rem',
              lineHeight: 1.2
            }}
          >
            {brandStory.subheading}
          </p>
        </div>

        {/* Two-Column Editorial Story Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 0.9fr',
            gap: 'clamp(2rem, 5vw, 5rem)',
            alignItems: 'center'
          }}
          className="story-grid"
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {brandStory.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                  color: 'var(--text-primary)',
                  lineHeight: 1.75
                }}
              >
                {p}
              </p>
            ))}

            <div
              style={{
                marginTop: '1rem',
                padding: '1.5rem',
                borderRadius: '20px',
                backgroundColor: 'rgba(255, 255, 255, 0.65)',
                border: '1.5px solid rgba(49, 10, 62, 0.15)',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--text-primary)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Flame size={22} color="var(--accent-orange)" />
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                <strong>Authentic Kitchen Promise:</strong> Every roll is tossed fresh on hot iron tawas, momos are freshly folded and bamboo-steamed, and every wok recipe is prepared live to order.
              </p>
            </div>
          </div>

          {/* Right Editorial Showcase Card & Key Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div
              style={{
                backgroundColor: '#310A3E',
                color: '#FFF',
                borderRadius: '32px',
                padding: 'clamp(2rem, 4vw, 3rem)',
                boxShadow: '0 25px 60px rgba(49, 10, 62, 0.35)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255, 100, 30, 0.5) 0%, transparent 70%)',
                  filter: 'blur(30px)'
                }}
              />

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--accent-orange)',
                  display: 'block',
                  marginBottom: '1rem'
                }}
              >
                THE CRAVE IT CREED
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  lineHeight: 1.1,
                  letterSpacing: '0.02em',
                  marginBottom: '1.5rem'
                }}
              >
                "WE DON'T DO ORDINARY. WE DO OBSESSION."
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                }}
              >
                {brandStory.stats.map((stat, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
                        fontWeight: 900,
                        color: 'var(--accent-orange)',
                        lineHeight: 1
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.75)',
                        marginTop: '4px'
                      }}
                    >
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
