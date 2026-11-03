import React, { useState } from 'react';
import { SITE_CONFIG } from '../../data/siteContent';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowUpRight, MessageCircle, ArrowLeft } from 'lucide-react';

export default function ContactSection({ isStandalonePage = false, onNavigate }) {
  const { contact } = SITE_CONFIG;
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    inquiryType: 'Table Reservation',
    message: ''
  });

  const handleSubmit = e => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        email: '',
        inquiryType: 'Table Reservation',
        message: ''
      });
    }, 2000);
  };

  return (
    <section
      id="contact"
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
              PAGE 05 // VISIT & RESERVATIONS
            </span>
          </div>
        )}
        {/* Section Tag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
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
            SECTION 06 • CONNECT & DINE
          </span>
        </div>

        {/* Section Heading */}
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 7vw, 6.5rem)',
              color: 'var(--text-primary)',
              lineHeight: 0.9,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            SIT AT OUR TABLE.<br />
            OR WE DELIVER.
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              marginTop: '12px',
              maxWidth: '560px'
            }}
          >
            Visit our flagship kitchen at LDA Colony, Lucknow or call our live desk for reservations,
            party platters, and immediate home delivery.
          </p>
        </div>

        {/* Two-Column Grid: Contact Information Cards vs. Inquiry Form */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.1fr',
            gap: 'clamp(2rem, 4vw, 4rem)'
          }}
          className="contact-grid"
        >
          {/* Left: Verified Contact Information Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Address Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1.5px solid rgba(49, 10, 62, 0.15)',
                padding: '1.75rem',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#310A3E',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <MapPin size={22} color="var(--accent-orange)" />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  RESTAURANT LOCATION
                </span>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 800, color: '#310A3E', marginBottom: '4px' }}>
                  {contact.restaurantName}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#542452', lineHeight: 1.5, marginBottom: '10px' }}>
                  {contact.address}
                </p>
                <a
                  href={contact.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: 'var(--accent-orange)',
                    textDecoration: 'none'
                  }}
                >
                  <span>OPEN IN GOOGLE MAPS</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(12px)',
                borderRadius: '24px',
                border: '1.5px solid rgba(49, 10, 62, 0.15)',
                padding: '1.75rem',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start'
              }}
            >
              <div
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: '#310A3E',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                <Clock size={22} color="var(--accent-orange)" />
              </div>

              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--text-secondary)',
                    display: 'block',
                    marginBottom: '4px'
                  }}
                >
                  KITCHEN TIMINGS
                </span>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 800, color: '#310A3E', marginBottom: '4px' }}>
                  {contact.openingHours}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#542452' }}>
                  Seven days a week. Breakfast to late-night culinary cravings.
                </p>
              </div>
            </div>

            {/* Direct Phone & Email Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px'
              }}
            >
              <a
                href={`tel:${contact.phone}`}
                style={{
                  backgroundColor: '#310A3E',
                  color: '#FFF',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <Phone size={20} color="var(--accent-orange)" />
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', opacity: 0.8, textTransform: 'uppercase', display: 'block' }}>
                    CALL DIRECT
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>{contact.phone}</span>
                </div>
              </a>

              <a
                href={contact.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#25D366',
                  color: '#FFF',
                  borderRadius: '20px',
                  padding: '1.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-3px)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'translateY(0)')}
              >
                <MessageCircle size={20} />
                <div>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', opacity: 0.9, textTransform: 'uppercase', display: 'block' }}>
                    WHATSAPP
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800 }}>LIVE CHAT</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right: Interactive Editorial Contact Form */}
          <div
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(16px)',
              borderRadius: '32px',
              border: '2px solid var(--text-primary)',
              padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
              boxShadow: '0 20px 50px rgba(49, 10, 62, 0.12)'
            }}
          >
            {formSubmitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: '#15803D',
                    color: '#FFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    boxShadow: '0 10px 25px rgba(21, 128, 61, 0.35)'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-anton)', fontSize: '2rem', color: '#310A3E', marginBottom: '8px' }}>
                  MESSAGE RECEIVED
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#542452', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Thank you! Our Lucknow desk will connect with you within 15 minutes.
                </p>
                <button type="button" onClick={() => setFormSubmitted(false)} className="btn-pill">
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-anton)',
                    fontSize: '1.8rem',
                    color: '#310A3E',
                    letterSpacing: '0.02em',
                    lineHeight: 1
                  }}
                >
                  SEND AN INQUIRY OR RESERVATION
                </h3>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Priyanshu Sharma"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(49, 10, 62, 0.2)',
                      background: '#FFF',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-body)',
                      color: '#310A3E'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Phone *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 99191..."
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(49, 10, 62, 0.2)',
                        background: '#FFF',
                        fontSize: '0.92rem',
                        fontFamily: 'var(--font-body)',
                        color: '#310A3E'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '6px' }}>
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={e => setFormData({ ...formData, inquiryType: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '12px',
                        border: '1.5px solid rgba(49, 10, 62, 0.2)',
                        background: '#FFF',
                        fontSize: '0.88rem',
                        fontFamily: 'var(--font-body)',
                        color: '#310A3E',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Table Reservation">Table Reservation</option>
                      <option value="Home Delivery Order">Home Delivery Order</option>
                      <option value="Bulk Party Catering">Bulk Party Catering</option>
                      <option value="Chef Special Inquiry">Chef Special Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 800, color: '#310A3E', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Special Requests / Message
                  </label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Guest count, timing, spicy preference, dietary details..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: '1.5px solid rgba(49, 10, 62, 0.2)',
                      background: '#FFF',
                      fontSize: '0.92rem',
                      fontFamily: 'var(--font-body)',
                      color: '#310A3E',
                      resize: 'none'
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-accent"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    fontSize: '0.92rem',
                    justifyContent: 'center',
                    marginTop: '6px'
                  }}
                >
                  <Send size={16} />
                  <span>SUBMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 880px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
