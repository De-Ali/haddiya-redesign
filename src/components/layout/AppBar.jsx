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
  // Exact match
  const exact = titles[pathname];
  if (exact) return exact[lang];

  // Dynamic: /products/:categoryId or /products/:categoryId/:subcategoryId
  if (pathname.startsWith('/products/')) {
    const parts = pathname.split('/');
    const catId = parts[2];
    const cat = categories.find(c => String(c.id) === catId);
    if (cat) {
      // Check for subcategory
      if (parts[3] && cat.subcategories) {
        const sub = cat.subcategories.find(s => s.id === parts[3]);
        if (sub) return lang === 'ar' ? sub.nameAr : sub.name;
      }
      return lang === 'ar' ? cat.nameAr : cat.name;
    }
    return lang === 'ar' ? 'المنتجات' : 'Products';
  }

  // Dynamic: /order/:id
  if (pathname.startsWith('/order/')) {
    const orderId = pathname.split('/')[2];
    return lang === 'ar' ? `طلب #${orderId}` : `Order #${orderId}`;
  }

  // Dynamic: /vendor-portal/product/:id
  if (pathname.startsWith('/vendor-portal/product/')) {
    return lang === 'ar' ? 'تفاصيل المنتج' : 'Product Details';
  }

  return '';
}

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
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mx-4 mt-2 mb-1 px-4 py-2.5 flex items-center justify-between z-40 rounded-2xl"
      style={{
        background: 'rgba(255,255,255,0.75)',
        backdropFilter: 'blur(20px) saturate(1.5)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
        border: '1px solid rgba(255,255,255,0.60)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.90)',
      }}
    >
      {/* Left */}
      <div className="min-w-[40px]">
        {canGoBack ? (
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(0,0,0,0.05)' }}
          >
            <BackIcon size={18} variant="Outline" color="#3C3C43" />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>

      {/* Title */}
      <h1 className="font-display text-[18px] font-semibold text-dark tracking-tight leading-none flex-1 text-center px-3 truncate">
        {title}
      </h1>

      {/* Right */}
      <div className="min-w-[40px] flex justify-end">
        {showSearch ? (
          <button
            onClick={() => navigate('/search')}
            className="w-9 h-9 rounded-full flex items-center justify-center active:scale-90 transition-transform"
            style={{ background: 'rgba(0,0,0,0.05)' }}
          >
            <SearchNormal1 size={17} variant="Outline" color="#6B7280" />
          </button>
        ) : showNotif ? (
          <button
            onClick={() => navigate('/notifications')}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center relative active:scale-90 transition-transform shadow-soft"
            style={{ border: '1px solid rgba(28,28,30,0.06)' }}
          >
            <Notification size={17} variant="Outline" color="#6B7280" />
            <span className="absolute top-1 end-1 w-[9px] h-[9px] bg-accent rounded-full border-[2px] border-white" />
          </button>
        ) : (
          <div className="w-10" />
        )}
      </div>
    </motion.div>
  );
}
