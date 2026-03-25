import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Setting4, ArrowSwapVertical } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';
import { categories } from '../../data/categories';
import ProductCard from '../../components/ui/ProductCard';
import BottomSheet from '../../components/ui/BottomSheet';
import Button from '../../components/ui/Button';

export default function ProductListing() {
  const { categoryId, subcategoryId } = useParams();
  const { t, lang } = useLanguage();
  const [showFilter, setShowFilter] = useState(false);
  const [sortBy, setSortBy] = useState('popular');

  let filtered;
  if (categoryId === 'new') {
    filtered = products.filter(p => p.isNew);
  } else if (categoryId === 'mothers-day') {
    filtered = products.filter(p => p.isMothersDay);
  } else if (subcategoryId) {
    filtered = products.filter(p => p.categoryId === Number(categoryId) && p.subcategoryId === subcategoryId);
  } else if (categoryId) {
    filtered = products.filter(p => p.categoryId === Number(categoryId));
  } else {
    filtered = products;
  }

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return b.reviewCount - a.reviewCount;
  });

  return (
    <div className="bg-mesh min-h-full">
      {/* Filter bar */}
      <div className="px-5 py-3 flex items-center justify-between">
        <p className="text-[12px] font-medium" style={{ color: 'rgba(138,122,112,0.70)' }}>
          {sorted.length} {lang === 'ar' ? 'منتج' : 'products'}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilter(true)}
            className="bg-white rounded-xl px-3.5 py-2 flex items-center gap-1.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
            style={{ color: 'rgba(28,28,30,0.70)' }}
          >
            <Setting4 size={14} variant="Outline" color="#1C1C1E" /> {t.product.filter}
          </button>
          <button
            onClick={() => setSortBy(s => s === 'price-low' ? 'price-high' : s === 'price-high' ? 'rating' : 'price-low')}
            className="bg-white rounded-xl px-3.5 py-2 flex items-center gap-1.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
            style={{ color: 'rgba(28,28,30,0.70)' }}
          >
            <ArrowSwapVertical size={14} variant="Outline" color="#1C1C1E" /> {t.product.sort}
          </button>
        </div>
      </div>

      {/* Products grid */}
      <div className="px-5 pb-6 grid grid-cols-2 gap-3">
        {sorted.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {/* Filter Sheet */}
      <BottomSheet isOpen={showFilter} onClose={() => setShowFilter(false)} title={t.product.filter}>
        <div className="space-y-5">
          <div>
            <p className="text-[13px] font-semibold mb-2.5" style={{ color: '#1C1C1E' }}>{t.product.price}</p>
            <div className="flex flex-wrap gap-2">
              {['0-25', '25-50', '50-100', '100+'].map(range => (
                <button
                  key={range}
                  className="bg-white rounded-xl px-4 py-2.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
                  style={{ color: 'rgba(28,28,30,0.70)' }}
                >
                  {range} OMR
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[13px] font-semibold mb-2.5" style={{ color: '#1C1C1E' }}>{t.product.rating}</p>
            <div className="flex flex-wrap gap-2">
              {[4, 3, 2].map(r => (
                <button
                  key={r}
                  className="bg-white rounded-xl px-4 py-2.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
                  style={{ color: 'rgba(28,28,30,0.70)' }}
                >
                  {r}+ ★
                </button>
              ))}
            </div>
          </div>
          <Button variant="primary" size="full" onClick={() => setShowFilter(false)}>
            {lang === 'ar' ? 'تطبيق' : 'Apply Filters'}
          </Button>
        </div>
      </BottomSheet>
    </div>
  );
}
