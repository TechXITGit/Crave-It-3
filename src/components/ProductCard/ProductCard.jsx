import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Plus, Eye, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart, openProductModal } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedHalf, setSelectedHalf] = useState(false);

  if (!product) return null;

  const hasVariants = Boolean(product.variants && product.variants.length > 0);
  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : null
  );

  const hasHalfOption = Boolean(product.halfPrice);
  const currentPrice = selectedHalf && product.halfPrice ? product.halfPrice : product.price;

  const handleQuickAdd = e => {
    e.stopPropagation();
    addToCart(product, 1, selectedHalf, selectedVariant);
  };

  return (
    <div
      className="editorial-card"
      onClick={() => openProductModal(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'relative',
        backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.75)' : 'rgba(241, 209, 233, 0.6)',
        borderRadius: '24px',
        border: '1.5px solid',
        borderColor: isHovered ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.16)',
        padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'visible',
        minHeight: '360px',
        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {/* Top Bar: Veg/Non-Veg & Editorial Category Label */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 2,
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            className={`diet-indicator ${product.isVeg ? 'veg' : 'non-veg'}`}
            title={product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          />
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.68rem',
              fontWeight: 800,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
              background: 'rgba(49, 10, 62, 0.08)',
              padding: '2px 8px',
              borderRadius: '4px'
            }}
          >
            {product.categoryName || product.category}
          </span>
        </div>

        {product.featured && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.65rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              backgroundColor: 'var(--accent-orange)',
              color: '#FFF',
              padding: '3px 8px',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 4px 10px rgba(255, 100, 30, 0.35)'
            }}
          >
            <Sparkles size={11} />
            CHEF PICK
          </span>
        )}
      </div>

      {/* Floating Center Food Cutout Image with Dynamic Scale & Rotation on Hover */}
      <div
        style={{
          position: 'relative',
          height: '180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '12px 0',
          zIndex: 2
        }}
      >
        {/* Soft Radial Ambient Glow */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: product.isVeg ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 100, 30, 0.22)',
            filter: 'blur(25px)',
            opacity: isHovered ? 1 : 0.4,
            transition: 'opacity 0.35s ease'
          }}
        />

        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transform: isHovered ? 'scale(1.12) rotate(4deg)' : 'scale(1) rotate(0deg)',
            filter: 'drop-shadow(0 14px 25px rgba(49, 10, 62, 0.18))',
            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
          onError={e => {
            e.target.src = '/images/food/chicken-drumstick.png';
          }}
        />

        {/* Quick View Button Hover Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '4px',
            right: '4px',
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.25s ease'
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              background: '#FFF',
              padding: '4px 10px',
              borderRadius: 'var(--radius-pill)',
              boxShadow: '0 4px 12px rgba(49, 10, 62, 0.15)'
            }}
          >
            <Eye size={12} /> DETAILS
          </span>
        </div>
      </div>

      {/* Product Details & Typography */}
      <div style={{ zIndex: 2, position: 'relative' }}>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.12rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: '6px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: 1.45,
            marginBottom: '14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description || `${product.categoryName || product.category} specialty cooked with authentic spices and fresh herbs.`}
        </p>

        {/* Selectable Variants (e.g. Dry / Gravy or Sweet / Pepper) */}
        {hasVariants && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: hasHalfOption ? '8px' : '12px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.66rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--text-secondary)',
                marginRight: '2px'
              }}
            >
              Style:
            </span>
            {product.variants.map(v => {
              const isSelected = selectedVariant === v;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => setSelectedVariant(v)}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    border: '1px solid',
                    borderColor: isSelected ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.2)',
                    backgroundColor: isSelected ? 'var(--text-primary)' : 'transparent',
                    color: isSelected ? '#FFF' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {v}
                </button>
              );
            })}
          </div>
        )}

        {/* Portion Selector (Full / Half toggle if available) */}
        {hasHalfOption && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '12px'
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedHalf(false)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: !selectedHalf ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.2)',
                backgroundColor: !selectedHalf ? 'var(--text-primary)' : 'transparent',
                color: !selectedHalf ? '#FFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Full {typeof product.price === 'number' ? `(₹${product.price})` : ''}
            </button>

            <button
              type="button"
              onClick={() => setSelectedHalf(true)}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                padding: '3px 8px',
                borderRadius: '6px',
                border: '1px solid',
                borderColor: selectedHalf ? 'var(--text-primary)' : 'rgba(49, 10, 62, 0.2)',
                backgroundColor: selectedHalf ? 'var(--text-primary)' : 'transparent',
                color: selectedHalf ? '#FFF' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              Half {typeof product.halfPrice === 'number' ? `(₹${product.halfPrice})` : ''}
            </button>
          </div>
        )}

        {/* Bottom Price & Add to Bag Trigger */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '8px',
            borderTop: '1px solid rgba(49, 10, 62, 0.12)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {typeof currentPrice === 'number' && currentPrice > 0 ? (
                <>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.6rem',
                      fontWeight: 900,
                      color: 'var(--accent-orange)',
                      lineHeight: 1
                    }}
                  >
                    ₹{currentPrice}
                  </span>
                  {product.pieces && (
                    <span
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--text-muted)',
                        fontWeight: 600
                      }}
                    >
                      / {selectedHalf ? 'Half' : product.pieces}
                    </span>
                  )}
                </>
              ) : (
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)'
                  }}
                >
                  Price coming soon
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            style={{
              backgroundColor: isHovered ? 'var(--accent-orange)' : 'var(--text-primary)',
              color: '#FFF',
              border: 'none',
              borderRadius: 'var(--radius-pill)',
              padding: '8px 16px',
              fontFamily: 'var(--font-body)',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              boxShadow: isHovered ? 'var(--shadow-orange)' : 'none'
            }}
            title={`Add ${product.name} to bag`}
          >
            <Plus size={14} strokeWidth={3} />
            <span>ADD</span>
          </button>
        </div>
      </div>
    </div>
  );
}
