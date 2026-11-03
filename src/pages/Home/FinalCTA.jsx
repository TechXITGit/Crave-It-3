import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onExploreMenu }) {
  return (
    <section
      id="cta"
      className="section-padding"
      style={{
        backgroundColor: 'var(--bg-primary)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Soft Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(400px, 60vw, 850px)',
          height: 'clamp(400px, 60vw, 850px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 100, 30, 0.22) 0%, rgba(220, 164, 216, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          maxWidth: '920px',
          margin: '0 auto'
        }}
      >
       

        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9.5vw, 9.5rem)',
            color: 'var(--text-primary)',
            lineHeight: 0.88,
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}
        >
          YOUR NEXT CRAVING<br />
          IS WAITING.
        </h2>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 1.4vw, 1.25rem)',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            margin: '0 auto clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.6
          }}
        >
          Four categories. 57 verified culinary recipes. Fresh hand-tossed rolls, steamed momos, fiery wok Chinese, and aromatic noodles.
          Delivered hot to your door in Lucknow.
        </p>

        {/* CTA Button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => {
              if (onExploreMenu) {
                onExploreMenu();
              } else {
                document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="btn-accent"
            style={{
              padding: '1.1rem 2.8rem',
              fontSize: '1rem',
              gap: '12px',
              boxShadow: '0 15px 40px rgba(255, 100, 30, 0.45)'
            }}
          >
            <span>EXPLORE THE MENU</span>
            <ArrowRight size={20} strokeWidth={2.4} />
          </button>
        </div>

        {/* Floating Dumplings & Platter Cutout Feature */}
        <div
          style={{
            marginTop: 'clamp(2.5rem, 5vw, 4.5rem)',
            display: 'flex',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <img
            src="/images/food/momos-plate-transparent.png"
            alt="Signature Steamed & Crispy Momos Platter"
            style={{
              maxWidth: 'clamp(280px, 45vw, 520px)',
              height: 'auto',
              filter: 'drop-shadow(0 25px 50px rgba(49, 10, 62, 0.28))'
            }}
            className="float-slow"
            onError={e => {
              e.target.src = '/images/food/chicken-roll.png';
            }}
          />
        </div>
      </div>
    </section>
  );
}
