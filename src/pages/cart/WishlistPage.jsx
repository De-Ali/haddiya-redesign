import { useNavigate } from 'react-router-dom';
import { Heart } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ui/ProductCard';

export default function WishlistPage() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const { wishlistItems } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="bg-mesh flex-1 flex flex-col items-center justify-center px-5" style={{ minHeight: 'calc(100vh - 180px)' }}>
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-5" style={{ background: 'rgba(122,30,43,0.06)' }}>
          <Heart size={32} variant="Outline" color="#7A1E2B" />
        </div>
        <p className="text-[14px] font-medium mb-1" style={{ color: '#3C3C43' }}>
          {lang === 'ar' ? 'قائمة المفضلة فارغة' : 'Your wishlist is empty'}
        </p>
        <p className="text-[12px] mb-5" style={{ color: '#AEAEB2' }}>
          {lang === 'ar' ? 'أضف منتجات تعجبك' : 'Save items you love'}
        </p>
        <button
          onClick={() => navigate('/home')}
          className="px-6 h-[44px] rounded-xl text-[13px] font-semibold active:scale-95 transition-transform"
          style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
        >
          {lang === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      <p className="text-[12px] mb-3 font-medium" style={{ color: '#AEAEB2' }}>
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
