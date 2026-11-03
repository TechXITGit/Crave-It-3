import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus, ShoppingBag, Sparkles, Check, Flame } from 'lucide-react';

export default function ProductModal() {
  const { selectedProduct, closeProductModal, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isHalf, setIsHalf] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    setQuantity(1);
    setIsHalf(false);
    setIsAdded(false);
    setSelectedVariant(selectedProduct?.variants && selectedProduct.variants.length > 0 ? selectedProduct.variants[0] : null);
  }, [selectedProduct]);

  useEffect(() => {
    const handleKeyDown = e => {
      if (e.key === 'Escape' && selectedProduct) {
        closeProductModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct, closeProductModal]);

  if (!selectedProduct) return null;

  const currentPrice = isHalf && selectedProduct.halfPrice ? selectedProduct.halfPrice : selectedProduct.price;
  const hasValidPrice = typeof currentPrice === 'number' && currentPrice > 0;
  const totalPrice = hasValidPrice ? currentPrice * quantity : null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, isHalf, selectedVariant);
    setIsAdded(true);
    setTimeout(() => {
      closeProductModal();
    }, 600);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(49, 10, 62, 0.75)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 2500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeInBackdrop 0.25s ease-out'
      }}
      onClick={closeProductModal}
    >
      <div
        style={{
          position: 'relative',
          backgroundColor: '#E8B8E2',
          borderRadius: '32px',
          border: '2px solid #310A3E',
          boxShadow: '0 30px 80px rgba(49, 10, 62, 0.45)',
          maxWidth: '820px',
          width: '100%',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          animation: 'scaleUpProduct 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        className="product-modal-grid"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProductModal}
          style={{
            position: 'absolute',
            top: '18px',
            right: '18px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: '#310A3E',
            color: '#FFF',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'transform 0.15s ease'
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FF641E')}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#310A3E')}
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Left Column: Dramatic Food Photography Stage */}
        <div
          style={{
            backgroundColor: 'rgba(220, 164, 216, 0.85)',
            padding: '2.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            borderRight: '1.5px solid rgba(49, 10, 62, 0.15)'
          }}
        >
          {/* Ambient Glow */}
          <div
            style={{
              position: 'absolute',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 100, 30, 0.35)',
              filter: 'blur(40px)',
              pointerEvents: 'none'
            }}
          />

          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            style={{
              maxWidth: '90%',
              maxHeight: '280px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 20px 35px rgba(49, 10, 62, 0.25))',
              transform: 'scale(1.05) rotate(2deg)',
              transition: 'transform 0.3s ease'
            }}
            onError={e => {
              e.target.src = '/images/food/chicken-drumstick.png';
            }}
          />

          <div
            style={{
              marginTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid rgba(49, 10, 62, 0.1)'
            }}
          >
            <Flame size={14} color="#FF641E" />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#310A3E',
                letterSpacing: '0.08em',
                textTransform: 'uppercase'
              }}
            >
              Freshly Prepared On Order
            </span>
          </div>
        </div>

        {/* Right Column: Dish Info, Portions & Add to Bag */}
        <div
          style={{
            padding: 'clamp(1.75rem, 3vw, 2.5rem)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#F1D1E9'
          }}
        >
          <div>
            {/* Tag line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span className={`diet-indicator ${selectedProduct.isVeg ? 'veg' : 'non-veg'}`} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#542452'
                }}
              >
                {selectedProduct.categoryName || selectedProduct.category}
              </span>
              <span style={{ color: 'rgba(49, 10, 62, 0.3)' }}>•</span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: selectedProduct.isVeg ? '#15803D' : '#B91C1C'
                }}
              >
                {selectedProduct.isVeg ? '100% Pure Veg' : 'Authentic Non-Veg'}
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                lineHeight: 1,
                color: '#310A3E',
                marginBottom: '12px',
                textTransform: 'uppercase'
              }}
            >
              {selectedProduct.name}
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: '#542452',
                lineHeight: 1.55,
                marginBottom: '1.5rem'
              }}
            >
              {selectedProduct.description ||
                `Carefully seasoned with proprietary freshly roasted spices and authentic Lucknawi culinary heritage. Made for serious food lovers.`}
            </p>

            {/* Selectable Variants (Dry / Gravy or Sweet / Pepper) */}
            {selectedProduct.variants && selectedProduct.variants.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#310A3E',
                    marginBottom: '8px'
                  }}
                >
                  Select Preparation / Style:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedProduct.variants.length}, 1fr)`, gap: '10px' }}>
                  {selectedProduct.variants.map(v => {
                    const isSelected = selectedVariant === v;
                    return (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setSelectedVariant(v)}
                        style={{
                          padding: '10px 14px',
                          borderRadius: '12px',
                          border: '2px solid',
                          borderColor: isSelected ? '#310A3E' : 'rgba(49, 10, 62, 0.15)',
                          backgroundColor: isSelected ? '#310A3E' : 'rgba(255, 255, 255, 0.5)',
                          color: isSelected ? '#FFF' : '#310A3E',
                          cursor: 'pointer',
                          textAlign: 'center',
                          fontFamily: 'var(--font-body)',
                          fontWeight: 800,
                          fontSize: '0.85rem',
                          transition: 'all 0.2s'
                        }}
                      >
                        {v}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Portion Options (Full / Half if present) */}
            {selectedProduct.halfPrice && (
              <div style={{ marginBottom: '1.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#310A3E',
                    marginBottom: '8px'
                  }}
                >
                  Select Portion Size:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setIsHalf(false)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: !isHalf ? '#310A3E' : 'rgba(49, 10, 62, 0.15)',
                      backgroundColor: !isHalf ? '#310A3E' : 'rgba(255, 255, 255, 0.5)',
                      color: !isHalf ? '#FFF' : '#310A3E',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>Full Portion</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                      {selectedProduct.pieces || 'Standard'} {typeof selectedProduct.price === 'number' ? `• ₹${selectedProduct.price}` : ''}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsHalf(true)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: isHalf ? '#310A3E' : 'rgba(49, 10, 62, 0.15)',
                      backgroundColor: isHalf ? '#310A3E' : 'rgba(255, 255, 255, 0.5)',
                      color: isHalf ? '#FFF' : '#310A3E',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontFamily: 'var(--font-body)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>Half Portion</div>
                    <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                      Half Plate {typeof selectedProduct.halfPrice === 'number' ? `• ₹${selectedProduct.halfPrice}` : ''}
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Controls: Quantity + Add CTA */}
          <div
            style={{
              paddingTop: '1.25rem',
              borderTop: '1.5px solid rgba(49, 10, 62, 0.15)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}
            >
              {/* Quantity Counter */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: '#FFF',
                  borderRadius: 'var(--radius-pill)',
                  border: '1.5px solid #310A3E',
                  padding: '4px'
                }}
              >
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#310A3E'
                  }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={15} />
                </button>
                <span
                  style={{
                    width: '36px',
                    textAlign: 'center',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 800,
                    fontSize: '1rem',
                    color: '#310A3E'
                  }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#310A3E'
                  }}
                  aria-label="Increase quantity"
                >
                  <Plus size={15} />
                </button>
              </div>

              {/* Price Display */}
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '0.72rem', color: '#542452', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block' }}>
                  Total
                </span>
                <span
                  style={{
                    fontFamily: hasValidPrice ? 'var(--font-display)' : 'var(--font-body)',
                    fontSize: hasValidPrice ? '2rem' : '1.1rem',
                    fontWeight: 900,
                    color: '#FF641E',
                    lineHeight: 1
                  }}
                >
                  {hasValidPrice ? `₹${totalPrice}` : 'Price coming soon'}
                </span>
              </div>
            </div>

            {/* Add to Bag Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-accent"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '0.92rem',
                justifyContent: 'center',
                backgroundColor: isAdded ? '#15803D' : 'var(--accent-orange)'
              }}
            >
              {isAdded ? (
                <>
                  <Check size={18} strokeWidth={3} />
                  <span>ADDED TO BAG!</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={18} strokeWidth={2.4} />
                  <span>ADD TO BAG {hasValidPrice ? `• ₹${totalPrice}` : '• Price coming soon'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .product-modal-grid {
            grid-template-columns: 1fr !important;
            max-height: 90vh !important;
            overflow-y: auto !important;
          }
        }
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleUpProduct {
          from { opacity: 0; transform: scale(0.92); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
