import { useState } from 'react';
import { motion } from 'framer-motion';
import { CloseCircle } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

const CANCEL_REASONS = [
  'I changed my mind',
  'Found a better price elsewhere',
  'Ordered by mistake',
  'Shipping time is too long',
];

export default function CancelOrderSheet({ isOpen, onClose, onConfirm, orderNumber }) {
  const [selectedReason, setSelectedReason] = useState('');

  const handleClose = () => {
    setSelectedReason('');
    onClose();
  };

  const handleConfirm = () => {
    if (!selectedReason) return;
    onConfirm?.(selectedReason);
    setSelectedReason('');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
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
          <CloseCircle size={30} color="#C0392B" variant="Bold" />
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
          margin: '0 0 12px',
          lineHeight: 1.3,
        }}
      >
        Cancel Order?
      </h2>

      {/* Order number badge */}
      {orderNumber && (
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 16px',
              borderRadius: 50,
              background: 'rgba(212,175,55,0.1)',
              border: '1.5px solid rgba(212,175,55,0.3)',
              fontSize: 12,
              fontWeight: 700,
              color: '#B8962E',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Order #{orderNumber}
          </span>
        </div>
      )}

      {/* Reason prompt */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 600,
          color: '#1A1A1A',
          margin: '0 0 12px',
          letterSpacing: '0.01em',
        }}
      >
        Why are you cancelling?
      </p>

      {/* Radio list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
        {CANCEL_REASONS.map((reason) => {
          const isSelected = selectedReason === reason;
          return (
            <motion.button
              key={reason}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedReason(reason)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                width: '100%',
                background: isSelected ? 'rgba(122,30,43,0.05)' : '#FAF8F5',
                border: isSelected ? '1.5px solid rgba(122,30,43,0.3)' : '1.5px solid #EDE8E1',
                borderRadius: 14,
                padding: '13px 16px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.18s ease',
              }}
            >
              {/* Radio dot */}
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: isSelected ? '2px solid #7A1E2B' : '2px solid #C4B8AE',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: 'all 0.18s ease',
                }}
              >
                {isSelected && (
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      background: '#7A1E2B',
                    }}
                  />
                )}
              </div>

              <span
                style={{
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? '#7A1E2B' : '#1A1A1A',
                  lineHeight: 1.4,
                  transition: 'all 0.18s ease',
                }}
              >
                {reason}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          whileTap={selectedReason ? { scale: 0.97 } : {}}
          onClick={handleConfirm}
          disabled={!selectedReason}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 50,
            background: selectedReason ? '#C0392B' : '#EDE8E1',
            color: selectedReason ? '#FFFFFF' : '#B0A89E',
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: selectedReason ? 'pointer' : 'not-allowed',
            letterSpacing: '0.01em',
            transition: 'all 0.25s ease',
            boxShadow: selectedReason ? '0 4px 16px rgba(192,57,43,0.28)' : 'none',
          }}
        >
          Cancel Order
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleClose}
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
          Keep Order
        </motion.button>
      </div>
    </BottomSheet>
  );
}
