import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft2, ArrowRight2, SearchNormal1, Notification } from 'iconsax-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

const titles = {
  '/categories':                   { en: 'Categories',        ar: 'الأقسام' },
  '/cart':                         { en: 'Shopping Cart',     ar: 'سلة التسوق' },
  '/wishlist':                     { en: 'Wishlist',          ar: 'المفضلة' },
  '/profile':                      { en: 'My Account',        ar: 'حسابي' },
  '/settings':                     { en: 'Settings',          ar: 'الإعدادات' },
  '/orders':                       { en: 'My Orders',         ar: 'طلباتي' },
  '/addresses':                    { en: 'Addresses',         ar: 'العناوين' },
  '/notifications':                { en: 'Notifications',     ar: 'الإشعارات' },
  '/help':                         { en: 'Help & FAQs',       ar: 'المساعدة' },
  '/search':                       { en: 'Search',            ar: 'البحث' },
  '/vendors':                      { en: 'All Vendors',       ar: 'جميع المتاجر' },
  '/checkout':                     { en: 'Checkout',          ar: 'إتمام الدفع' },
  '/privacy':                      { en: 'Privacy Policy',    ar: 'سياسة الخصوصية' },
  '/terms':                        { en: 'Terms & Conditions', ar: 'الشروط والأحكام' },
  '/refund':                       { en: 'Returns & Refunds', ar: 'الإرجاع والاسترداد' },
  '/shipping':                     { en: 'Shipping Info',     ar: 'معلومات الشحن' },
  '/payment-methods':              { en: 'Payment Methods',   ar: 'طرق الدفع' },
  '/shipping-to':                  { en: 'Shipping to',       ar: 'الشحن إلى' },
  '/send-as-gift':                 { en: 'Send as a Gift',    ar: 'أرسل كهدية' },
  '/vendor-portal':                { en: 'Become a Vendor',   ar: 'كن بائعاً' },
  '/vendor-portal/dashboard':      { en: 'Vendor Dashboard',  ar: 'لوحة التحكم' },
  '/vendor-portal/add-product':    { en: 'Add Product',       ar: 'إضافة منتج' },
  '/vendor-portal/products':       { en: 'My Products',       ar: 'منتجاتي' },
  '/vendor-portal/orders':         { en: 'Vendor Orders',     ar: 'الطلبات' },
  '/vendor-portal/earnings':       { en: 'Earnings',          ar: 'الأرباح' },
};

/* Pages that are bottom-nav tabs — NO back arrow */
const noBackRoutes = ['/categories', '/cart', '/wishlist', '/profile'];

/* Pages that show a search icon on the right */
const searchPages = ['/categories', '/wishlist'];

/* Pages that show a notification bell on the right */
const notifPages = ['/profile'];

function getTitle(pathname, lang) {
  const exact = titles[pathname];
  if (exact) return exact[lang];

  if (pathname.startsWith('/products/')) {
    const parts = pathname.split('/');
    const catId = parts[2];
    const cat = categories.find(c => String(c.id) === catId);
    if (cat) {
      if (parts[3] && cat.subcategories) {
        const sub = cat.subcategories.find(s => s.id === parts[3]);
        if (sub) return lang === 'ar' ? sub.nameAr : sub.name;
      }
      return lang === 'ar' ? cat.nameAr : cat.name;
    }
    return lang === 'ar' ? 'المنتجات' : 'Products';
  }

  if (pathname.startsWith('/order/')) {
    const orderId = pathname.split('/')[2];
    return lang === 'ar' ? `طلب #${orderId}` : `Order #${orderId}`;
  }

  if (pathname.startsWith('/vendor-portal/product/')) {
    return lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details';
  }

  return '';
}

/* ─── Glass Icon Button ──────────────────────────────────────────────── */
function GlassIconButton({ onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="w-[38px] h-[38px] rounded-[13px] flex items-center justify-center active:scale-90 transition-all"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.7), rgba(255,255,255,0.4))',
        border: '0.5px solid rgba(255,255,255,0.6)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {children}
    </button>
  );
}

/* ─── AppBar ─────────────────────────────────────────────────────────── */
export default function AppBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { lang, isRTL } = useLanguage();

  const title = getTitle(pathname, lang);
  const BackIcon = isRTL ? ArrowRight2 : ArrowLeft2;
  const canGoBack = !noBackRoutes.includes(pathname);
  const showSearch = searchPages.includes(pathname);
  const showNotif = notifPages.includes(pathname);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-3 mt-2 mb-1 px-3 py-2 flex items-center justify-between z-40"
      style={{
        borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0.45) 50%, rgba(248,245,240,0.55) 100%)',
        backdropFilter: 'blur(40px) saturate(2.0)',
        WebkitBackdropFilter: 'blur(40px) saturate(2.0)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.02), inset 0 1px 0 rgba(255,255,255,0.85)',
        border: '0.5px solid rgba(212,175,55,0.12)',
      }}
    >
      {/* Left */}
      <div className="min-w-[38px]">
        {canGoBack ? (
          <GlassIconButton onClick={() => navigate(-1)}>
            <BackIcon size={17} variant="Outline" color="#3C3C43" />
          </GlassIconButton>
        ) : (
          <div className="w-[38px]" />
        )}
      </div>

      {/* Title */}
      <h1
        className="flex-1 text-center px-2 truncate"
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 19,
          fontWeight: 700,
          color: '#1C1C1E',
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h1>

      {/* Right */}
      <div className="min-w-[38px] flex justify-end">
        {showSearch ? (
          <GlassIconButton onClick={() => navigate('/search')}>
            <SearchNormal1 size={17} variant="Outline" color="#6B7280" />
          </GlassIconButton>
        ) : showNotif ? (
          <GlassIconButton onClick={() => navigate('/notifications')}>
            <Notification size={17} variant="Outline" color="#6B7280" />
            <span
              className="absolute top-[6px] end-[6px] w-[8px] h-[8px] rounded-full"
              style={{
                background: 'linear-gradient(135deg, #D4AF37, #C9A02C)',
                boxShadow: '0 0 0 2px rgba(255,255,255,0.9)',
              }}
            />
          </GlassIconButton>
        ) : (
          <div className="w-[38px]" />
        )}
      </div>
    </motion.div>
  );
}
