import React, { useState, useEffect } from 'react';
import FloatingHeroObjects from '../../components/FloatingObjects/FloatingHeroObjects';
import { ArrowRight } from 'lucide-react';

export default function HeroSection({ onExploreClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = e => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2;
      const y = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '680px',
        maxHeight: '1080px',
        backgroundColor: '#DCA4D8',
        paddingTop: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Soft Neon Ambient Glow behind the food subject on the right */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: 'clamp(320px, 42vw, 620px)',
          height: 'clamp(320px, 42vw, 620px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 100, 30, 0.32) 0%, rgba(220, 164, 216, 0) 70%)',
          filter: 'blur(55px)',
          pointerEvents: 'none',
          zIndex: 2
        }}
      />

      {/* Floating Food Elements (kept in safe peripheral zones away from all text) */}
      <FloatingHeroObjects mousePos={mousePos} />

      {/* Main Container */}
      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {/* Left Column: Pure Editorial Typography Stack */}
        <div
          style={{
            maxWidth: '680px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 15
          }}
        >
          {/* Top-Left Small Editorial Text */}
          <div
            style={{
              marginBottom: 'clamp(1.25rem, 2.8vw, 2.25rem)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.72rem, 0.95vw, 0.88rem)',
                fontWeight: 800,
                letterSpacing: '0.22em',
                lineHeight: 1.35,
                color: '#310A3E',
                textTransform: 'uppercase'
              }}
            >
              FUTURE<br />
              LOOKS GOOD<br />
              ON YOUR PLATE.
            </p>
            {/* Fine Horizontal Accent Bar */}
            <div
              style={{
                width: '32px',
                height: '1.5px',
                backgroundColor: '#310A3E',
                marginTop: '8px'
              }}
            />
          </div>

          {/* Main Monolithic Condensed Headline matching "TOMORROW" in Reference */}
          <div
            style={{
              lineHeight: 0.84,
              marginBottom: 'clamp(1.25rem, 2.5vw, 2rem)'
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 6vw, 5.2rem)',
                fontWeight: 900,
                color: '#310A3E',
                letterSpacing: '0.02em',
                lineHeight: 0.88,
                marginBottom: '4px'
              }}
            >
              CRAVE
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4.8rem, 13vw, 13rem)',
                fontWeight: 900,
                color: '#310A3E',
                letterSpacing: '-0.01em',
                lineHeight: 0.82,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              TOMORROW
            </h1>
          </div>

          {/* Supporting Editorial Copy (2-3 clean uppercase lines) */}
          <div
            style={{
              marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)'
            }}
          >
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.82rem, 1.1vw, 1rem)',
                fontWeight: 700,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: '#310A3E',
                lineHeight: 1.5,
                maxWidth: '480px'
              }}
            >
              FASHION MEETS GASTRONOMY.<br />
              SAME YOU,<br />
              JUST MORE FUTURISTIC.
            </p>
          </div>

          {/* Clean Pill CTA Button matching reference image */}
          <div>
            <a
              href="#menu"
              onClick={e => {
                e.preventDefault();
                onExploreClick
                  ? onExploreClick()
                  : document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                padding: '0.85rem 2rem',
                borderRadius: 'var(--radius-pill)',
                border: '1.5px solid #310A3E',
                backgroundColor: 'transparent',
                color: '#310A3E',
                fontFamily: 'var(--font-body)',
                fontSize: '0.82rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                textDecoration: 'none',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#310A3E';
                e.currentTarget.style.color = '#FFF';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 10px 25px rgba(49, 10, 62, 0.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#310A3E';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>EXPLORE THE MENU</span>
              <ArrowRight size={17} strokeWidth={2.4} />
            </a>
          </div>
        </div>
      </div>

      {/* Right Subject: Massive, Photorealistic Neon Glazed Cutout Anchored to Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 'clamp(0.5rem, 4vw, 5rem)',
          height: 'clamp(520px, 86vh, 880px)',
          zIndex: 8,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'flex-end',
          transform: `translate(${mousePos.x * -10}px, ${mousePos.y * -8}px)`,
          transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="hero-subject-wrapper"
      >
        <img
          src="/images/food/editorial-hero-drumstick-clean.png"
          alt="CRAVE IT Neon Glazed Roasted Chicken Leg"
          style={{
            height: '100%',
            width: 'auto',
            maxHeight: '100%',
            maxWidth: '56vw',
            objectFit: 'contain',
            objectPosition: 'bottom right',
            display: 'block',
            filter: 'drop-shadow(0 25px 45px rgba(49, 10, 62, 0.22)) drop-shadow(0 10px 30px rgba(255, 100, 30, 0.38))'
          }}
          onError={e => {
            e.target.src = '/images/food/chicken-drumstick.png';
          }}
        />
      </div>

      {/* Responsive adjustments */}
      <style>{`
        @media (max-width: 900px) {
          #hero {
            height: auto !important;
            min-height: 100vh !important;
            padding-top: calc(var(--nav-height) + 2rem) !important;
            padding-bottom: 4rem !important;
          }
          .hero-subject-wrapper {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            height: 380px !important;
            margin: 2rem auto 0 !important;
            justify-content: center !important;
          }
          .hero-subject-wrapper img {
            maxWidth: 85vw !important;
          }
        }
      `}</style>
    </section>
  );
}
