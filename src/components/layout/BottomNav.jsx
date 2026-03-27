import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home2,
  Category2,
  Bag2,
  Heart,
  ProfileCircle,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';

const TABS = [
  { path: '/home',       key: 'home',       Icon: Home2 },
  { path: '/categories', key: 'categories', Icon: Category2 },
  { path: '/cart',        key: 'cart',        Icon: Bag2, isCart: true },
  { path: '/wishlist',    key: 'wishlist',    Icon: Heart },
  { path: '/profile',     key: 'profile',     Icon: ProfileCircle },
];

/* ─── Cart Badge ─────────────────────────────────────────────────────── */
function CartBadge({ count }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key="badge"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="absolute -top-[4px] -end-[6px] min-w-[16px] h-[16px] rounded-full
                     flex items-center justify-center z-20 px-[3px]"
          style={{
            background: '#D4AF37',
            color: '#fff',
            fontSize: 8,
            fontWeight: 800,
            boxShadow: '0 2px 6px rgba(212,175,55,0.4)',
          }}
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

/* ─── BottomNav ──────────────────────────────────────────────────────── */
export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { cartCount } = useCart();

  return (
    <div
      className="shrink-0 z-50 w-full flex justify-center"
      style={{
        paddingBottom: 'max(8px, env(safe-area-inset-bottom, 8px))',
        paddingTop: 6,
        paddingLeft: 12,
        paddingRight: 12,
      }}
    >
      {/* Pill container */}
      <nav
        className="w-full flex items-center justify-between px-2 py-2"
        style={{
          borderRadius: 28,
          /* Frosted glass — warm maroon/gold tint */
          background: 'linear-gradient(135deg, rgba(122,30,43,0.06) 0%, rgba(212,175,55,0.04) 50%, rgba(122,30,43,0.06) 100%)',
          backdropFilter: 'blur(40px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(40px) saturate(1.8)',
          border: '1px solid rgba(255,255,255,0.55)',
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.06),
            0 2px 8px rgba(0,0,0,0.03),
            inset 0 1px 0 rgba(255,255,255,0.7),
            inset 0 -0.5px 0 rgba(0,0,0,0.02)
          `,
        }}
      >
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path !== '/home' && location.pathname.startsWith(tab.path));
          const label = t?.nav?.[tab.key] ?? tab.key;
          const { Icon, isCart } = tab;

          return (
            <motion.button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              whileTap={{ scale: 0.9 }}
              className="relative outline-none select-none"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: isActive ? 6 : 0,
                height: 44,
                paddingLeft: isActive ? 14 : 12,
                paddingRight: isActive ? 18 : 12,
                borderRadius: 22,
                background: isActive
                  ? 'linear-gradient(135deg, #7A1E2B, #5C1620)'
                  : 'transparent',
                boxShadow: isActive
                  ? '0 4px 16px rgba(122,30,43,0.30), inset 0 1px 0 rgba(255,255,255,0.12)'
                  : 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              {/* Icon */}
              <div className="relative flex items-center justify-center">
                <Icon
                  size={20}
                  variant={isActive ? 'Bold' : 'Outline'}
                  color={isActive ? '#FFFFFF' : '#8A7A70'}
                />
                {isCart && <CartBadge count={cartCount} />}
              </div>

              {/* Label — only visible when active */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    style={{
                      color: '#FFFFFF',
                      fontSize: 12,
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>
    </div>
  );
}
