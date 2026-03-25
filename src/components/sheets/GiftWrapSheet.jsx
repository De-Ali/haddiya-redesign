import { motion } from 'framer-motion';
import BottomSheet from '../ui/BottomSheet';

export default function GiftWrapSheet({ isOpen, onClose, onContinue, onRemove }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Gift emoji */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 40,
          lineHeight: 1,
          marginBottom: 16,
        }}
      >
        🎁
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
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}
      >
        Gift Wrap Added!
      </h2>

      {/* Body */}
      <p
        style={{
          fontSize: 14,
          color: '#8A7A70',
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 8px',
        }}
      >
        Beautifully wrapped.
      </p>

      {/* Price tag */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 5,
            padding: '6px 16px',
            borderRadius: 50,
            background: 'rgba(212,175,55,0.1)',
            border: '1px solid rgba(212,175,55,0.3)',
            fontSize: 13,
            fontWeight: 600,
            color: '#B8962E',
          }}
        >
          +OMR 0.500 added to total
        </span>
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
          marginBottom: 16,
        }}
      >
        Great, Continue
      </motion.button>

      {/* Remove gift wrap ghost link */}
      <div style={{ textAlign: 'center' }}>
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={onRemove || onClose}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: 13,
            fontWeight: 500,
            color: '#8A7A70',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(138,122,112,0.4)',
            textUnderlineOffset: 3,
            padding: '4px 8px',
          }}
        >
          Remove Gift Wrap
        </motion.button>
      </div>
    </BottomSheet>
  );
}
