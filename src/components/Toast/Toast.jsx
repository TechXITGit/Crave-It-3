import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export default function Toast() {
  const { toastMessage, setToastMessage } = useCart();

  if (!toastMessage) return null;

  const isSuccess = toastMessage.type === 'success';

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '14px 20px',
        backgroundColor: '#310A3E',
        color: '#FFF',
        borderRadius: '9999px',
        boxShadow: '0 12px 35px rgba(49, 10, 62, 0.4)',
        border: '1.5px solid rgba(255, 100, 30, 0.5)',
        maxWidth: '90vw',
        animation: 'slideUpToast 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {isSuccess ? (
        <CheckCircle2 size={18} color="#FF641E" style={{ flexShrink: 0 }} />
      ) : (
        <Info size={18} color="#FFC36B" style={{ flexShrink: 0 }} />
      )}
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.85rem',
          fontWeight: 500,
          letterSpacing: '0.02em',
          lineHeight: 1.3
        }}
      >
        {toastMessage.message}
      </span>
      <button
        onClick={() => setToastMessage(null)}
        style={{
          background: 'none',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.7)',
          cursor: 'pointer',
          padding: '2px',
          display: 'flex',
          alignItems: 'center',
          marginLeft: '4px'
        }}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>

      <style>{`
        @keyframes slideUpToast {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
