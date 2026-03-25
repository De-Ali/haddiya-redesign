import { motion } from 'framer-motion';
import { Heart } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

export default function RemoveFromWishlistSheet({ isOpen, onClose, onConfirm, item }) {
  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Heart icon */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(122,30,43,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Heart size={32} color="#7A1E2B" variant="Outline" />
        </div>
      </div>

      {/* Title */}
      <h2
        className="font-heading"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: '#1A1A1A',
          textAlign: 'center',
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}
      >
        Remove from Wishlist?
      </h2>

      {/* Item name if provided */}
      {item?.name && (
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#7A1E2B',
            textAlign: 'center',
            margin: '0 0 8px',
          }}
        >
          {item.name}
        </p>
      )}

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
        This item will be removed from your saved wishlist. You can always add it back later.
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
          Remove
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
          Keep Saved
        </motion.button>
      </div>
    </BottomSheet>
  );
}
