import { motion, AnimatePresence } from 'framer-motion';

export default function BottomSheet({ isOpen, onClose, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.52)',
              zIndex: 80,
              backdropFilter: 'blur(2px)',
              WebkitBackdropFilter: 'blur(2px)',
            }}
          />

          {/* Centering wrapper — stays fixed, holds the sheet centered */}
          <div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 81,
              display: 'flex',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
            {/* Sheet — motion only controls Y, centering is handled by parent flex */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                width: '100%',
                maxWidth: 430,
                background: '#FFFFFF',
                borderRadius: '24px 24px 0 0',
                padding: '0 24px 44px',
                boxShadow: '0 -8px 48px rgba(0,0,0,0.12), 0 -2px 8px rgba(0,0,0,0.06)',
                pointerEvents: 'auto',
              }}
            >
              {/* Drag Handle */}
              <div
                style={{
                  width: 40,
                  height: 4,
                  background: '#EDE8E1',
                  borderRadius: 50,
                  margin: '14px auto 24px',
                }}
              />
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
