import { motion } from 'framer-motion';
import { Trash } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

export default function RemoveFromCartSheet({ isOpen, onClose, onConfirm, item }) {
  if (!item) return null;

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      {/* Icon */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
        <div
          style={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: 'rgba(192, 57, 43, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Trash size={26} color="#C0392B" variant="Bold" />
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
          margin: '0 0 20px',
          lineHeight: 1.3,
        }}
      >
        Remove Item?
      </h2>

      {/* Product preview card */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          background: '#FAF8F5',
          border: '1px solid #EDE8E1',
          borderRadius: 16,
          padding: '14px 16px',
          marginBottom: 24,
        }}
      >
        {/* Thumbnail */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 12,
            overflow: 'hidden',
            flexShrink: 0,
            background: '#EDE8E1',
            border: '1px solid rgba(237,232,225,0.8)',
          }}
        >
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 20,
              }}
            >
              🎁
            </div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#1A1A1A',
              margin: '0 0 4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.name}
          </p>
          <p
            style={{
              fontSize: 13,
              color: '#7A1E2B',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {item.price}
          </p>
        </div>
      </div>

      {/* Body text */}
      <p
        style={{
          fontSize: 14,
          color: '#8A7A70',
          textAlign: 'center',
          lineHeight: 1.6,
          margin: '0 0 24px',
        }}
      >
        This item will be removed from your cart.
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
          Keep in Cart
        </motion.button>
      </div>
    </BottomSheet>
  );
}
