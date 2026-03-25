import { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchNormal1, CloseCircle, TrendUp, Clock } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';

const trending = ['Perfumes', 'Rose Box', 'Gold Necklace', 'Watches', 'Khanjar'];
const trendingAr = ['عطور', 'صندوق ورد', 'عقد ذهبي', 'ساعات', 'خنجر'];
const recent = ['Oud Collection', 'Leather Bag'];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const { lang, t } = useLanguage();

  const results = query.length > 1
    ? products.filter(p => {
        const name = lang === 'ar' ? p.nameAr : p.name;
        return name.toLowerCase().includes(query.toLowerCase());
      })
    : [];

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      {/* Search input */}
      <div className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3.5 mb-6 shadow-soft border border-white/60">
        <SearchNormal1 size={18} variant="Outline" color="rgba(138,122,112,0.60)" className="flex-shrink-0" />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={t.home.search}
          className="flex-1 bg-transparent outline-none text-[14px] font-medium"
          style={{ color: '#1C1C1E' }}
        />
        {query && (
          <button onClick={() => setQuery('')} className="active:scale-90 transition-transform">
            <CloseCircle size={18} variant="Bold" color="rgba(138,122,112,0.50)" />
          </button>
        )}
      </div>

      {query.length < 2 ? (
        <div className="space-y-7">
          {/* Recent */}
          {recent.length > 0 && (
            <div>
              <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2" style={{ color: '#1C1C1E' }}>
                <Clock size={14} variant="Outline" color="rgba(138,122,112,0.70)" />
                {lang === 'ar' ? 'بحث سابق' : 'Recent Searches'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {recent.map(q => (
                  <button
                    key={q}
                    onClick={() => setQuery(q)}
                    className="bg-white rounded-xl px-4 py-2.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
                    style={{ color: 'rgba(28,28,30,0.70)' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Trending */}
          <div>
            <h3 className="text-[13px] font-semibold mb-3 flex items-center gap-2" style={{ color: '#1C1C1E' }}>
              <TrendUp size={14} variant="Outline" color="#D4AF37" />
              {lang === 'ar' ? 'رائج الآن' : 'Trending Now'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(lang === 'ar' ? trendingAr : trending).map(q => (
                <button
                  key={q}
                  onClick={() => setQuery(q)}
                  className="bg-white rounded-xl px-4 py-2.5 text-[12px] font-medium shadow-soft border border-white/60 active:scale-95 transition-transform"
                  style={{ color: 'rgba(28,28,30,0.70)' }}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : results.length > 0 ? (
        <div>
          <p className="text-[12px] mb-3" style={{ color: 'rgba(138,122,112,0.70)' }}>
            {results.length} {lang === 'ar' ? 'نتيجة' : 'results'}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {results.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <SearchNormal1 size={40} variant="Outline" color="rgba(138,122,112,0.30)" className="mx-auto mb-3" />
          <p className="text-[14px] font-medium" style={{ color: 'rgba(138,122,112,0.70)' }}>
            {lang === 'ar' ? 'لا توجد نتائج' : 'No results found'}
          </p>
          <p className="text-[12px] mt-1" style={{ color: 'rgba(138,122,112,0.50)' }}>
            {lang === 'ar' ? 'جرب كلمات أخرى' : 'Try different keywords'}
          </p>
        </div>
      )}
    </div>
  );
}
