import { useNavigate } from 'react-router-dom';
import { Heart } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ui/ProductCard';

export default function WishlistPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { wishlistItems } = useCart();
  const { isLoggedIn } = useAuth();

  /* ── Not logged in state ── */
  if (!isLoggedIn) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-6"
        style={{ minHeight: 'calc(100dvh - 160px)', background: '#FAF8F5' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}haddiya-logo.png`}
          alt="Haddiya"
          className="w-[100px] h-[100px] object-contain mb-6"
        />
        <button
          onClick={() => navigate('/login')}
          className="w-full max-w-[280px] h-[52px] rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform"
          style={{ background: '#7A1E2B', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(122,30,43,0.25)' }}
        >
          {lang === 'ar' ? 'تسجيل / دخول' : 'Register / Login'}
        </button>
      </div>
    );
  }

  /* ── Empty wishlist (logged in) ── */
  if (wishlistItems.length === 0) {
    return (
      <div
        className="flex-1 flex flex-col items-center justify-center px-6"
        style={{ minHeight: 'calc(100dvh - 160px)', background: '#FAF8F5' }}
      >
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5"
          style={{ background: 'rgba(122,30,43,0.06)' }}
        >
          <Heart size={32} variant="Outline" color="#7A1E2B" />
        </div>
        <p className="text-[16px] font-semibold mb-1" style={{ color: '#1A1A1A' }}>
          {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
        </p>
        <p className="text-[13px] mb-6" style={{ color: '#8A7A70' }}>
          {lang === 'ar' ? 'أضف منتجات تعجبك' : 'Save items you love'}
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-8 h-[48px] rounded-full text-[14px] font-semibold active:scale-95 transition-transform"
          style={{ background: '#D4AF37', color: '#1A1A1A' }}
        >
          {lang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
        </button>
      </div>
    );
  }

  /* ── Wishlist with items ── */
  return (
    <div style={{ background: '#FAF8F5', minHeight: '100%', padding: '16px 16px 24px' }}>
      <p className="text-[12px] mb-3 font-medium" style={{ color: '#8A7A70' }}>
        {wishlistItems.length} {lang === 'ar' ? 'منتج' : 'items'}
      </p>
      <div className="grid grid-cols-2 gap-3">
        {wishlistItems.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
