import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BottomNav from './BottomNav';
import AppBar from './AppBar';

const noNavRoutes = [
  '/', '/splash', '/onboarding',
  '/login', '/signup', '/otp', '/forgot-password',
  '/checkout', '/order-success',
];

const noAppBarRoutes = [
  '/', '/splash', '/onboarding',
  '/home',
  '/login', '/signup', '/otp', '/forgot-password',
];

/* Routes that have their own custom header inside the page */
const customHeaderRoutes = ['/product/', '/vendor/', '/vendor-portal/product/'];

const fullScreenRoutes = [
  '/', '/splash', '/onboarding',
  '/login', '/signup', '/otp', '/forgot-password',
];

/* ─── MobileFrame ────────────────────────────────────────────────────────── */
export default function MobileFrame({ children }) {
  const { pathname } = useLocation();

  const showNav          = !noNavRoutes.includes(pathname);
  const hasCustomHeader  = customHeaderRoutes.some(r => pathname.startsWith(r));
  const showAppBar       = !noAppBarRoutes.includes(pathname) && !hasCustomHeader;
  const isFullScreen     = fullScreenRoutes.includes(pathname);

  return (
    <div
      className="flex flex-col mx-auto w-full"
      style={{
        maxWidth: '430px',
        minHeight: '100vh',
        background: 'var(--color-bg)',
      }}
    >
      {/* Safe area top spacer for notched phones */}
      {!isFullScreen && (
        <div className="shrink-0" style={{ height: 'env(safe-area-inset-top, 0px)' }} />
      )}

      {isFullScreen ? (
        <div className="flex-1 flex flex-col min-h-0">{children}</div>
      ) : (
        <>
          {showAppBar && (
            <div className="shrink-0 z-40">
              <AppBar />
            </div>
          )}
          <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={pathname}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="min-h-full"
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
          {showNav && <BottomNav />}
        </>
      )}
    </div>
  );
}
