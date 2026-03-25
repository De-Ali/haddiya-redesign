import { motion } from 'framer-motion';
import { TickCircle, Tag } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

export default function PromoSuccessSheet({ isOpen, onClose, onContinue, promoCode, savings }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Success icon */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'rgba(212,175,55,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TickCircle size={40} color="#D4AF37" variant="Bold" />
          </div>
          {/* Glow ring */}
          <div
            style={{
              position: 'absolute',
              inset: -4,
              borderRadius: '50%',
              border: '2px solid rgba(212,175,55,0.2)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-heading"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 24,
          fontWeight: 600,
          color: '#1A1A1A',
          textAlign: 'center',
          margin: '0 0 20px',
          lineHeight: 1.3,
        }}
      >
        Promo Applied!
      </h2>

      {/* Code + savings display */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(212,175,55,0.08) 0%, rgba(212,175,55,0.04) 100%)',
          border: '1.5px solid rgba(212,175,55,0.3)',
          borderRadius: 18,
          padding: '18px 20px',
          marginBottom: 24,
        }}
      >
        {/* Promo code row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: savings ? 14 : 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag size={16} color="#D4AF37" variant="Bold" />
            <span style={{ fontSize: 12, color: '#8A7A70', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              Promo Code
            </span>
          </div>
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: '#B8962E',
              letterSpacing: '0.08em',
              background: 'rgba(212,175,55,0.15)',
              padding: '4px 12px',
              borderRadius: 50,
              border: '1px solid rgba(212,175,55,0.25)',
            }}
          >
            {promoCode}
          </span>
        </div>

        {/* Savings row */}
        {savings && (
          <>
            <div
              style={{
                height: 1,
                background: 'rgba(212,175,55,0.2)',
                marginBottom: 14,
              }}
            />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: 13, color: '#8A7A70', fontWeight: 500 }}>
                You're saving
              </span>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  color: '#D4AF37',
                }}
              >
                {savings}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Continue button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onContinue || onClose}
        style={{
          width: '100%',
          height: 52,
          borderRadius: 50,
          background: 'linear-gradient(135deg, #C9A830 0%, #D4AF37 50%, #C9A830 100%)',
          color: '#FFFFFF',
          fontSize: 15,
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          letterSpacing: '0.01em',
          boxShadow: '0 4px 20px rgba(212,175,55,0.38)',
        }}
      >
        Continue to Checkout
      </motion.button>
    </BottomSheet>
  );
}
