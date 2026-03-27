import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import ProductCard from '../../components/ui/ProductCard';

export default function WishlistPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { wishlistItems } = useCart();
  const { isLoggedIn } = useAuth();

  /* ── Empty or not logged in — show Register / Login ── */
  if (!isLoggedIn || wishlistItems.length === 0) {
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
          onClick={() => navigate('/login-phone', { state: { returnTo: '/wishlist' } })}
          className="w-full max-w-[280px] h-[52px] rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform"
          style={{ background: '#7A1E2B', color: '#FFFFFF', boxShadow: '0 4px 16px rgba(122,30,43,0.25)' }}
        >
          {lang === 'ar' ? 'تسجيل / دخول' : 'Register / Login'}
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
