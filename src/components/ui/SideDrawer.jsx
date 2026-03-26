import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Gift, CloseCircle,
  Home2, Lovely, Star1, Airdrop, Clock, Crown1,
  Bag2, Buildings, EmojiHappy, TruckFast, Card,
} from 'iconsax-react';
import { useDrawer } from '../../context/DrawerContext';
import { useLanguage } from '../../context/LanguageContext';
import { drawerMenu } from '../../data/drawerMenu';
import DrawerMenuItem from './DrawerMenuItem';

/* Map icon string names to actual iconsax components */
const iconMap = {
  Home2, Lovely, Star1, Airdrop, Clock, Crown1,
  Bag2, Buildings, EmojiHappy, TruckFast, Card,
};

export default function SideDrawer() {
  const { isOpen, closeDrawer } = useDrawer();
  const { isRTL } = useLanguage();
  const { pathname } = useLocation();

  /* Close drawer on route change */
  useEffect(() => {
    closeDrawer();
  }, [pathname, closeDrawer]);

  /* Lock body scroll when open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const slideFrom = isRTL ? '100%' : '-100%';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60]"
            style={{ background: 'rgba(0,0,0,0.35)' }}
            onClick={closeDrawer}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: slideFrom }}
            animate={{ x: 0 }}
            exit={{ x: slideFrom }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 bottom-0 z-[61] flex flex-col bg-white overflow-hidden"
            style={{
              width: '85vw',
              maxWidth: '320px',
              [isRTL ? 'right' : 'left']: 0,
              boxShadow: '4px 0 24px rgba(0,0,0,0.10)',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 pt-6 pb-4 shrink-0">
              <div className="flex items-center gap-3">
                <img src={`${import.meta.env.BASE_URL}haddiya-logo.png`} alt="Haddiya" className="w-10 h-10 object-contain" />
                <div>
                  <h2 className="font-display text-[18px] font-semibold tracking-tight leading-none" style={{ color: '#1C1C1E' }}>
                    Haddiya
                  </h2>
                  <p className="text-[8px] font-bold tracking-[0.20em] uppercase mt-[2px]" style={{ color: '#D4AF37' }}>
                    PREMIUM GIFTS
                  </p>
                </div>
              </div>
              <button
                onClick={closeDrawer}
                className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
                style={{ background: 'rgba(0,0,0,0.04)' }}
              >
                <CloseCircle size={20} variant="Outline" color="#8E8E93" />
              </button>
            </div>

            {/* ── Divider ── */}
            <div className="mx-5 gold-divider mb-1" />

            {/* ── Menu items (scrollable) ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
              {drawerMenu.map((item) => {
                const Icon = iconMap[item.icon] || null;
                return <DrawerMenuItem key={item.id} item={item} Icon={Icon} />;
              })}
            </div>

            {/* ── Footer ── */}
            <div className="shrink-0 px-5 py-4 border-t" style={{ borderColor: 'rgba(0,0,0,0.04)' }}>
              <p className="text-[10px] text-center" style={{ color: '#AEAEB2' }}>
                Haddiya v2.0 — Premium Gift Shopping
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
