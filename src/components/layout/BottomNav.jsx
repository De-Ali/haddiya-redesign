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

// Tab definitions — variant prop drives iconsax filled vs outline rendering
const TABS = [
  {
    path:    '/home',
    key:     'home',
    Icon:    Home2,
  },
  {
    path:    '/categories',
    key:     'categories',
    Icon:    Category2,
  },
  {
    path:    '/cart',
    key:     'cart',
    Icon:    Bag2,
    isCart:  true,
  },
  {
    path:    '/wishlist',
    key:     'wishlist',
    Icon:    Heart,
  },
  {
    path:    '/profile',
    key:     'profile',
    Icon:    ProfileCircle,
  },
];

// ─── CartBadge ────────────────────────────────────────────────────────────────

function CartBadge({ count }) {
  return (
    <AnimatePresence>
      {count > 0 && (
        <motion.span
          key="badge"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="absolute -top-[7px] -end-[7px] min-w-[17px] h-[17px] rounded-full
                     flex items-center justify-center z-20 px-[3px]
                     text-[9px] font-bold leading-none text-white"
          style={{
            background: 'var(--color-accent)',
            boxShadow: '0 2px 6px rgba(212,175,55,0.40), 0 0 0 1.5px white',
          }}
        >
          {count > 99 ? '99+' : count}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── NavTab ───────────────────────────────────────────────────────────────────

function NavTab({ tab, isActive, cartCount, label, onPress }) {
  const { Icon, key, isCart } = tab;

  return (
    <motion.button
      onClick={onPress}
      whileTap={{ scale: 0.88 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className="relative flex flex-col items-center gap-[3px] py-1 flex-1
                 outline-none focus-visible:outline-none select-none"
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      {/* Pill highlight behind active icon */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            layoutId="navPill"
            className="absolute top-0 rounded-[14px]"
            style={{
              width: '48px',
              height: '36px',
              background: 'rgba(122, 30, 43, 0.09)',
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          />
        )}
      </AnimatePresence>

      {/* Icon wrapper */}
      <div className="relative w-[36px] h-[36px] flex items-center justify-center">
        <Icon
          size={22}
          variant={isActive ? 'Bold' : 'Outline'}
          color={isActive ? 'var(--color-primary)' : 'rgba(28,28,30,0.38)'}
        />
        {isCart && <CartBadge count={cartCount} />}
      </div>

      {/* Label */}
      <motion.span
        animate={{
          color: isActive ? 'var(--color-primary)' : 'rgba(28,28,30,0.38)',
          fontWeight: isActive ? 700 : 500,
        }}
        transition={{ duration: 0.18 }}
        className="text-[10px] leading-none tracking-[0.01em]"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

export default function BottomNav() {
  const location   = useLocation();
  const navigate   = useNavigate();
  const { t }      = useLanguage();
  const { cartCount } = useCart();

  return (
    <nav
      className="glass-nav shrink-0 z-50 w-full"
      style={{ paddingBottom: 'max(20px, env(safe-area-inset-bottom, 20px))' }}
    >
      <div className="flex items-center justify-around px-1 pt-[6px]">
        {TABS.map((tab) => {
          const isActive = location.pathname === tab.path ||
            (tab.path !== '/home' && location.pathname.startsWith(tab.path));

          const label = t?.nav?.[tab.key] ?? tab.key;

          return (
            <NavTab
              key={tab.path}
              tab={tab}
              isActive={isActive}
              cartCount={tab.isCart ? cartCount : 0}
              label={label}
              onPress={() => navigate(tab.path)}
            />
          );
        })}
      </div>
    </nav>
  );
}
