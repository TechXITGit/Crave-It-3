import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { SITE_CONFIG } from '../../data/siteContent';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    deliveryFee,
    packagingFee,
    cartTotal
  } = useCart();

  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderId, setOrderId] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 499;
  const amountNeededForFreeDelivery = Math.max(0, freeDeliveryThreshold - cartSubtotal);
  const freeDeliveryProgress = Math.min(100, (cartSubtotal / freeDeliveryThreshold) * 100);

  const handlePlaceOrder = e => {
    e.preventDefault();
    if (cart.length === 0) return;

    const newOrderId = `CRV-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);
    setIsCheckingOut(false);
    setOrderSuccess(true);

    // Launch celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FF641E', '#310A3E', '#FFC36B', '#DCA4D8']
    });
  };

  const handleWhatsAppOrder = () => {
    const itemsList = cart
      .map(item => `• ${item.quantity}× ${item.name} (${item.variantLabel || 'Full'}) - ₹${item.price * item.quantity}`)
      .join('%0A');
    const text = `*New Order from CRAVE IT Editorial*%0A%0A*Order ID:* ${orderId || 'NEW'}%0A*Customer:* ${customerName || 'Valued Guest'}%0A*Phone:* ${customerPhone || 'Not specified'}%0A*Address:* ${customerAddress || 'Not specified'}%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* ₹${cartSubtotal}%0A*Delivery:* ₹${deliveryFee}%0A*Packaging:* ₹${packagingFee}%0A*Grand Total:* ₹${cartTotal}%0A%0APlease confirm my order!`;
    window.open(`https://wa.me/919919121513?text=${text}`, '_blank');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(49, 10, 62, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        zIndex: 3000,
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeInBackdrop 0.25s ease-out'
      }}
      onClick={closeCart}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '520px',
          height: '100%',
          backgroundColor: '#E8B8E2',
          borderLeft: '2px solid #310A3E',
          boxShadow: '-20px 0 60px rgba(49, 10, 62, 0.35)',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          animation: 'slideInDrawer 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '1.5rem',
            borderBottom: '1.5px solid rgba(49, 10, 62, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#F1D1E9'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={22} color="#310A3E" strokeWidth={2.4} />
            <h2
              style={{
                fontFamily: 'var(--font-anton)',
                fontSize: '1.6rem',
                color: '#310A3E',
                letterSpacing: '0.04em',
                lineHeight: 1
              }}
            >
              YOUR SHOPPING BAG
            </h2>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                fontWeight: 800,
                backgroundColor: '#310A3E',
                color: '#FFF',
                padding: '2px 8px',
                borderRadius: 'var(--radius-pill)'
              }}
            >
              {cart.reduce((c, i) => c + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={closeCart}
            style={{
              background: 'none',
              border: 'none',
              color: '#310A3E',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '50%',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = 'rgba(49, 10, 62, 0.1)')}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
            aria-label="Close bag"
          >
            <X size={22} />
          </button>
        </div>

        {/* Free Delivery Goal Bar */}
        {cart.length > 0 && !orderSuccess && (
          <div
            style={{
              padding: '10px 1.5rem',
              backgroundColor: 'rgba(255, 100, 30, 0.12)',
              borderBottom: '1px solid rgba(255, 100, 30, 0.25)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 700, color: '#310A3E', marginBottom: '6px' }}>
              <span>
                {amountNeededForFreeDelivery > 0
                  ? `Add ₹${amountNeededForFreeDelivery} more for FREE delivery!`
                  : '🎉 Free delivery unlocked!'}
              </span>
              <span>{Math.round(freeDeliveryProgress)}%</span>
            </div>
            <div style={{ height: '5px', backgroundColor: 'rgba(49, 10, 62, 0.12)', borderRadius: '3px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${freeDeliveryProgress}%`,
                  backgroundColor: '#FF641E',
                  borderRadius: '3px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        )}

        {/* Content Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {orderSuccess ? (
            /* Order Placed Success View */
            <div
              style={{
                textAlign: 'center',
                padding: '2rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#15803D',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  boxShadow: '0 10px 30px rgba(21, 128, 61, 0.35)'
                }}
              >
                <CheckCircle2 size={40} />
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#15803D',
                  marginBottom: '4px'
                }}
              >
                ORDER CONFIRMED
              </span>

              <h3
                style={{
                  fontFamily: 'var(--font-anton)',
                  fontSize: '2rem',
                  color: '#310A3E',
                  marginBottom: '8px'
                }}
              >
                PREPARING YOUR CRAVINGS
              </h3>

              <div
                style={{
                  backgroundColor: '#FFF',
                  padding: '12px 20px',
                  borderRadius: '14px',
                  border: '1.5px solid #310A3E',
                  margin: '12px 0 1.5rem',
                  fontFamily: 'monospace',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#FF641E'
                }}
              >
                {orderId}
              </div>

              <p style={{ fontSize: '0.88rem', color: '#542452', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                Estimated preparation time: <strong>25–35 minutes</strong>.<br />
                Fresh from our tandoor & handis at LDA Colony, Lucknow.
              </p>

              {/* Direct WhatsApp Confirmation Button */}
              <button
                type="button"
                onClick={handleWhatsAppOrder}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: 'var(--radius-pill)',
                  padding: '12px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  width: '100%',
                  marginBottom: '10px'
                }}
              >
                <MessageCircle size={18} />
                <span>CONFIRM VIA WHATSAPP</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setOrderSuccess(false);
                  closeCart();
                }}
                className="btn-pill"
                style={{ width: '100%', marginTop: '6px' }}
              >
                START A NEW ORDER
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '1.4rem', color: '#310A3E' }}>
                  DELIVERY DETAILS
                </h3>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#FF641E',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  ← Back to Bag
                </button>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Ayushmaan Singh"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #310A3E',
                    background: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    color: '#310A3E'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Phone Number (Call / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={e => setCustomerPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #310A3E',
                    background: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    color: '#310A3E'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '4px' }}>
                  Delivery Address in Lucknow *
                </label>
                <textarea
                  required
                  rows={3}
                  value={customerAddress}
                  onChange={e => setCustomerAddress(e.target.value)}
                  placeholder="Apartment / House number, Street, Landmark, Sector, LDA Colony..."
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1.5px solid #310A3E',
                    background: '#FFF',
                    fontSize: '0.9rem',
                    fontFamily: 'var(--font-body)',
                    color: '#310A3E',
                    resize: 'none'
                  }}
                />
              </div>

              <div
                style={{
                  backgroundColor: '#FFF',
                  padding: '14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(49, 10, 62, 0.15)',
                  fontSize: '0.82rem',
                  color: '#542452'
                }}
              >
                <p><strong>Payment Mode:</strong> Cash on Delivery / UPI upon arrival</p>
                <p style={{ fontSize: '0.75rem', marginTop: '4px', opacity: 0.8 }}>
                  Our kitchen receives your ticket immediately and prepares fresh hot food.
                </p>
              </div>

              <button
                type="submit"
                className="btn-accent"
                style={{
                  width: '100%',
                  padding: '1rem',
                  fontSize: '0.92rem',
                  justifyContent: 'center',
                  marginTop: '10px'
                }}
              >
                PLACE ORDER • ₹{cartTotal}
              </button>
            </form>
          ) : cart.length === 0 ? (
            /* Empty State */
            <div
              style={{
                textAlign: 'center',
                padding: '4rem 1rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(49, 10, 62, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#310A3E',
                  marginBottom: '8px'
                }}
              >
                <ShoppingBag size={36} opacity={0.6} />
              </div>
              <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '1.6rem', color: '#310A3E' }}>
                YOUR BAG IS HUNGRY
              </h3>
              <p style={{ fontSize: '0.88rem', color: '#542452', maxWidth: '280px', lineHeight: 1.5 }}>
                Explore our 57 authentic recipes, from flaky hand-rolled kathi rolls to wok-tossed noodles.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="btn-pill"
                style={{ marginTop: '12px' }}
              >
                EXPLORE MENU
              </button>
            </div>
          ) : (
            /* Items List */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cart.map(item => (
                <div
                  key={item.cartItemId}
                  style={{
                    backgroundColor: '#FFF',
                    borderRadius: '16px',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px',
                    border: '1px solid rgba(49, 10, 62, 0.1)',
                    boxShadow: '0 4px 12px rgba(49, 10, 62, 0.04)'
                  }}
                >
                  {/* Food Image Cutout Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(220, 164, 216, 0.25)',
                      flexShrink: 0
                    }}
                    onError={e => {
                      e.target.src = '/images/food/chicken-drumstick.png';
                    }}
                  />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span className={`diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}`} />
                      <h4
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '0.9rem',
                          fontWeight: 800,
                          color: '#310A3E',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {item.name}
                      </h4>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#542452', marginTop: '2px' }}>
                      <span>{item.variantLabel || 'Full'}</span> • <strong>₹{item.price}</strong>
                    </div>

                    {/* Quantity modifier controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          backgroundColor: '#F1D1E9',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid rgba(49, 10, 62, 0.2)',
                          padding: '2px'
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#310A3E'
                          }}
                          aria-label="Reduce quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ width: '24px', textAlign: 'center', fontSize: '0.8rem', fontWeight: 800, color: '#310A3E' }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          style={{
                            width: '24px',
                            height: '24px',
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
                          <Plus size={13} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'rgba(49, 10, 62, 0.45)',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = '#B91C1C')}
                        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(49, 10, 62, 0.45)')}
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        fontWeight: 900,
                        color: '#310A3E'
                      }}
                    >
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Breakdown & Action Button */}
        {cart.length > 0 && !orderSuccess && !isCheckingOut && (
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#F1D1E9',
              borderTop: '1.5px solid rgba(49, 10, 62, 0.15)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px', fontSize: '0.82rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#542452' }}>
                <span>Subtotal</span>
                <strong>₹{cartSubtotal}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#542452' }}>
                <span>Eco Packaging</span>
                <strong>₹{packagingFee}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#542452' }}>
                <span>Delivery Fee</span>
                <strong style={{ color: deliveryFee === 0 ? '#15803D' : '#542452' }}>
                  {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                </strong>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: '8px',
                  borderTop: '1px solid rgba(49, 10, 62, 0.15)',
                  fontSize: '1.1rem',
                  fontWeight: 900,
                  color: '#310A3E'
                }}
              >
                <span>Grand Total</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: '#FF641E' }}>
                  ₹{cartTotal}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCheckingOut(true)}
              className="btn-accent"
              style={{
                width: '100%',
                padding: '1rem',
                fontSize: '0.92rem',
                justifyContent: 'center'
              }}
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight size={18} strokeWidth={2.4} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
