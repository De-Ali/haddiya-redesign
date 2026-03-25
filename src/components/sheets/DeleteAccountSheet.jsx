import { useState } from 'react';
import { motion } from 'framer-motion';
import { TickSquare } from 'iconsax-react';
import BottomSheet from '../ui/BottomSheet';

export default function DeleteAccountSheet({ isOpen, onClose, onConfirm }) {
  const [checked, setChecked] = useState(false);

  const handleClose = () => {
    setChecked(false);
    onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      {/* Warning emoji */}
      <div
        style={{
          textAlign: 'center',
          fontSize: 32,
          marginBottom: 14,
          lineHeight: 1,
        }}
      >
        ⚠️
      </div>

      {/* Title */}
      <h2
        className="font-heading"
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 22,
          fontWeight: 600,
          color: '#C0392B',
          textAlign: 'center',
          margin: '0 0 10px',
          lineHeight: 1.3,
        }}
      >
        Delete Account?
      </h2>

      {/* Body */}
      <p
        style={{
          fontSize: 14,
          color: '#8A7A70',
          textAlign: 'center',
          lineHeight: 1.65,
          margin: '0 0 24px',
        }}
      >
        This permanently deletes your account, orders, addresses and all data. Cannot be undone.
      </p>

      {/* Divider */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, #EDE8E1, transparent)',
          marginBottom: 20,
        }}
      />

      {/* Checkbox */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={() => setChecked((prev) => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          background: checked ? 'rgba(192,57,43,0.04)' : 'rgba(237,232,225,0.4)',
          border: checked ? '1.5px solid rgba(192,57,43,0.25)' : '1.5px solid #EDE8E1',
          borderRadius: 14,
          padding: '14px 16px',
          cursor: 'pointer',
          marginBottom: 24,
          transition: 'all 0.2s ease',
          textAlign: 'left',
        }}
      >
        {/* Custom checkbox visual */}
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            border: checked ? '2px solid #C0392B' : '2px solid #C4B8AE',
            background: checked ? '#C0392B' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'all 0.2s ease',
          }}
        >
          {checked && (
            <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
              <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
        <span
          style={{
            fontSize: 13,
            fontWeight: 500,
            color: checked ? '#C0392B' : '#8A7A70',
            lineHeight: 1.4,
            transition: 'color 0.2s ease',
          }}
        >
          I understand this is permanent
        </span>
      </motion.button>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <motion.button
          whileTap={checked ? { scale: 0.97 } : {}}
          onClick={checked ? onConfirm : undefined}
          disabled={!checked}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 50,
            background: checked ? '#C0392B' : '#EDE8E1',
            color: checked ? '#FFFFFF' : '#B0A89E',
            fontSize: 15,
            fontWeight: 600,
            border: 'none',
            cursor: checked ? 'pointer' : 'not-allowed',
            letterSpacing: '0.01em',
            transition: 'all 0.25s ease',
            boxShadow: checked ? '0 4px 16px rgba(192,57,43,0.28)' : 'none',
          }}
        >
          Delete Account
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
          Keep Account
        </motion.button>
      </div>
    </BottomSheet>
  );
}
