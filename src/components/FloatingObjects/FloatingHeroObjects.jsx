import React, { useState } from 'react';

export default function FloatingHeroObjects({ mousePos }) {
  // mousePos has normalized { x: -1 to 1, y: -1 to 1 }
  const x = mousePos?.x || 0;
  const y = mousePos?.y || 0;

  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 12
      }}
      aria-hidden="true"
    >
      {/* 1. Complete Fresh Juicy Lemon Slice (Full round citrus wheel, uncropped) */}
      <div
        className="dynamic-float-lemon"
        onMouseEnter={() => setHoveredItem('lemon')}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          position: 'absolute',
          top: '9%',
          right: '8%',
          width: 'clamp(85px, 8.5vw, 125px)',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transform: `translate3d(${x * 22}px, ${y * 20}px, 0) rotate(${8 + (hoveredItem === 'lemon' ? 24 : 0)}deg) scale(${hoveredItem === 'lemon' ? 1.14 : 1})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
          filter: hoveredItem === 'lemon'
            ? 'drop-shadow(0 20px 35px rgba(234, 179, 8, 0.65))'
            : 'drop-shadow(0 14px 26px rgba(234, 179, 8, 0.38))',
          opacity: 0.98,
          zIndex: 14
        }}
        title="Fresh Organic Sun-ripened Lemon"
      >
        <img
          src="/images/food/floating-lemon-slice.png"
          alt="Fresh Lemon Slice"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none'
          }}
          onError={e => {
            e.target.src = '/images/food/floating-orange-slice.png';
          }}
        />
      </div>

      {/* 2. Complete Whole Red Chilli Pepper (Whole body, curved green stem and tip visible, uncropped) */}
      <div
        className="dynamic-float-chilli"
        onMouseEnter={() => setHoveredItem('chilli')}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          position: 'absolute',
          top: '12%',
          left: '38%',
          width: 'clamp(95px, 9vw, 140px)',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transform: `translate3d(${x * 28}px, ${y * -24}px, 0) rotate(${22 + (hoveredItem === 'chilli' ? -18 : 0)}deg) scale(${hoveredItem === 'chilli' ? 1.15 : 1})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
          filter: hoveredItem === 'chilli'
            ? 'drop-shadow(0 22px 40px rgba(220, 38, 38, 0.65))'
            : 'drop-shadow(0 14px 28px rgba(185, 28, 28, 0.35))',
          opacity: 0.98,
          zIndex: 15
        }}
        title="Fresh Fiery Red Chilli Pepper"
      >
        <img
          src="/images/food/floating-red-chilli.png"
          alt="Whole Fresh Red Chilli"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none'
          }}
        />
      </div>

      {/* 3. Floating Fresh Coriander Sprig (Upper Right Corridor) */}
      <div
        className="dynamic-float-coriander"
        onMouseEnter={() => setHoveredItem('coriander')}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          position: 'absolute',
          top: '22%',
          right: '32%',
          width: 'clamp(55px, 6vw, 90px)',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transform: `translate3d(${x * -18}px, ${y * 16}px, 0) rotate(${-12 + (hoveredItem === 'coriander' ? 15 : 0)}deg) scale(${hoveredItem === 'coriander' ? 1.12 : 1})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
          filter: hoveredItem === 'coriander'
            ? 'drop-shadow(0 16px 28px rgba(22, 101, 52, 0.45))'
            : 'drop-shadow(0 10px 20px rgba(49, 10, 62, 0.2))',
          opacity: 0.92,
          zIndex: 13
        }}
        title="Fresh Coriander Herbs"
      >
        <img
          src="/images/food/floating-coriander.png"
          alt="Fresh Coriander Herbs"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none'
          }}
        />
      </div>

      {/* 4. Floating Crispy Golden Bite (Far Right Lower Edge) */}
      <div
        className="dynamic-float-bite"
        onMouseEnter={() => setHoveredItem('bite')}
        onMouseLeave={() => setHoveredItem(null)}
        style={{
          position: 'absolute',
          bottom: '16%',
          right: '3%',
          width: 'clamp(55px, 5.5vw, 85px)',
          pointerEvents: 'auto',
          cursor: 'pointer',
          transform: `translate3d(${x * -14}px, ${y * 14}px, 0) rotate(${-8 + (hoveredItem === 'bite' ? 20 : 0)}deg) scale(${hoveredItem === 'bite' ? 1.15 : 1})`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease',
          filter: hoveredItem === 'bite'
            ? 'drop-shadow(0 18px 30px rgba(255, 100, 30, 0.55))'
            : 'drop-shadow(0 12px 22px rgba(255, 100, 30, 0.3))',
          opacity: 0.9,
          zIndex: 13
        }}
        title="Crispy Panko Crunch Bite"
      >
        <img
          src="/images/food/floating-crispy-bite.png"
          alt="Crispy Crunch Bite"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
            userSelect: 'none'
          }}
        />
      </div>

      <style>{`
        @keyframes floatLemon {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-16px) rotate(6deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes floatChilli {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(-8deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes floatCoriander {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(7deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        @keyframes floatBite {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-14px) rotate(-6deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }
        .dynamic-float-lemon {
          animation: floatLemon 6s ease-in-out infinite;
        }
        .dynamic-float-chilli {
          animation: floatChilli 5.2s ease-in-out infinite 0.6s;
        }
        .dynamic-float-coriander {
          animation: floatCoriander 7s ease-in-out infinite 1.2s;
        }
        .dynamic-float-bite {
          animation: floatBite 5.8s ease-in-out infinite 0.4s;
        }
      `}</style>
    </div>
  );
}
