import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CloseCircle, TicketDiscount, Copy } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Promotional Pop-up — highlights seasonal deals & coupon codes.
 * Per client request (Meet3 UX Review): strategic, non-intrusive, attention-grabbing.
 *
 * Behaviour:
 *   • Appears 1.4s after Home mount so hero/search are painted first.
 *   • Shown at most once per browser session (sessionStorage flag).
 *   • User can dismiss (X), copy coupon, or CTA to search.
 */
export default function PromoPopup() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const COUPON = 'MUBARAK20';
  const SESSION_KEY = 'haddiya_promo_seen';

  /* Mount timer — respects session flag */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = sessionStorage.getItem(SESSION_KEY);
    if (seen) return;
    const timer = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setOpen(false);
  };

  const copyCoupon = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(COUPON).catch(() => {});
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const shopNow = () => {
    close();
    navigate('/search');
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            background: 'rgba(0,0,0,0.55)',
            backdropFilter: 'blur(6px)',
            WebkitBackdropFilter: 'blur(6px)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 12 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 340,
              borderRadius: 24,
              overflow: 'hidden',
              background: 'linear-gradient(160deg, #7A1E2B 0%, #5A1520 55%, #3A0D15 100%)',
              boxShadow: '0 24px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(212,175,55,0.18)',
            }}
          >
            {/* Decorative gold orbs */}
            <div style={{ position: 'absolute', top: -60, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: -50, left: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />

            {/* Close */}
            <button
              onClick={close}
              aria-label="Close"
              style={{
                position: 'absolute', top: 12, [isAr ? 'left' : 'right']: 12,
                width: 32, height: 32, borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
              }}
              className="active:scale-90 transition-transform"
            >
              <CloseCircle size={20} variant="Bold" color="#FFFFFF" />
            </button>

            {/* Content */}
            <div style={{ position: 'relative', padding: '28px 24px 22px', textAlign: 'center', zIndex: 1 }}>
              {/* Gift emoji badge */}
              <motion.div
                initial={{ rotate: -12, scale: 0.9 }}
                animate={{ rotate: [-12, 6, -6, 0], scale: 1 }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                style={{
                  width: 72, height: 72, borderRadius: 24,
                  background: 'linear-gradient(135deg, #E8CD6B 0%, #D4AF37 50%, #B8962E 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 14px',
                  boxShadow: '0 10px 24px rgba(212,175,55,0.35), inset 0 1px 0 rgba(255,255,255,0.40)',
                  fontSize: 36,
                }}
              >
                🎁
              </motion.div>

              {/* Tag */}
              <p style={{ fontSize: 10, fontWeight: 700, color: '#D4AF37', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: 6 }}>
                {isAr ? 'عرض خاص' : 'Exclusive Offer'}
              </p>

              {/* Title */}
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, marginBottom: 8, fontFamily: isAr ? 'var(--font-arabic)' : 'var(--font-display)' }}>
                {isAr ? 'خصم 20% على الهدايا الفاخرة' : 'Get 20% Off Luxury Gifts'}
              </h2>

              {/* Subtitle */}
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 18, padding: '0 4px' }}>
                {isAr
                  ? 'استخدم الكوبون أدناه واستمتع بخصم على طلبك الأول'
                  : 'Apply the code below and save on your first order.'}
              </p>

              {/* Coupon box */}
              <button
                onClick={copyCoupon}
                className="active:scale-[0.98] transition-transform"
                style={{
                  width: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 10,
                  padding: '12px 16px',
                  borderRadius: 14,
                  background: 'rgba(255,255,255,0.10)',
                  border: '1.5px dashed rgba(212,175,55,0.55)',
                  marginBottom: 14,
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <TicketDiscount size={20} variant="Bold" color="#D4AF37" />
                  <span style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', letterSpacing: '2px' }}>
                    {COUPON}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, fontWeight: 600, color: copied ? '#FFE9A0' : '#D4AF37' }}>
                  <Copy size={14} variant="Outline" color={copied ? '#FFE9A0' : '#D4AF37'} />
                  {copied ? (isAr ? 'تم النسخ' : 'Copied') : (isAr ? 'نسخ' : 'Copy')}
                </div>
              </button>

              {/* CTA */}
              <button
                onClick={shopNow}
                className="active:scale-[0.98] transition-transform"
                style={{
                  width: '100%', height: 48,
                  borderRadius: 14,
                  background: 'linear-gradient(135deg, #E8CD6B 0%, #D4AF37 100%)',
                  color: '#1A1A1A',
                  fontSize: 14, fontWeight: 700,
                  border: 'none', cursor: 'pointer',
                  boxShadow: '0 8px 22px rgba(212,175,55,0.30)',
                }}
              >
                {isAr ? 'تسوّق الآن' : 'Shop Now'}
              </button>

              {/* Fine print */}
              <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', marginTop: 10 }}>
                {isAr ? 'العرض ساري لفترة محدودة' : 'Limited-time offer · T&C apply'}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
