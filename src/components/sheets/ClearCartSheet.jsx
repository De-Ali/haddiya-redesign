import { motion } from 'framer-motion';
import { ShoppingCart } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

export default function ClearCartSheet({ isOpen, onClose, onConfirm, itemCount = 0 }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Icon */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(192,57,43,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShoppingCart size={28} color="#C0392B" variant="Bold" />
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-heading"
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22,
          fontWeight: 600,
          color: '#1A1A1A',
          textAlign: 'center',
          margin: '0 0 16px',
          lineHeight: 1.3,
        }}
      >
        Clear Cart?
      </h2>

      {/* Item count badge */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            paddingLeft: 16,
            paddingRight: 16,
            height: 32,
            borderRadius: 50,
            background: '#7A1E2B',
            color: '#FFFFFF',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.02em',
          }}
        >
          {itemCount} {itemCount === 1 ? 'item' : 'items'}
        </span>
      </div>

      {/* Body */}
      <p
        style={{
          fontSize: 14,
          color: '#8A7A70',
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 28px',
        }}
      >
        All {itemCount} {itemCount === 1 ? 'item' : 'items'} will be permanently removed from your cart. This cannot be undone.
      </p>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 50,
            background: '#C0392B',
            color: '#FFFFFF',
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.01em',
            boxShadow: '0 4px 16px rgba(192,57,43,0.28)',
          }}
        >
          Clear All
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 50,
            background: '#FFFFFF',
            color: '#7A1E2B',
            fontSize: 15,
            fontWeight: 600,
            border: '2px solid #7A1E2B',
            cursor: 'pointer',
            letterSpacing: '0.01em',
          }}
        >
          Cancel
        </motion.button>
      </div>
    </BottomSheet>
  );
}
