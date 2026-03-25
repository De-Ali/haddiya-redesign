import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft2, ArrowRight2, TickCircle, Location, Star1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { vendors } from '../../data/vendors';
import { products } from '../../data/products';
import ProductCard from '../../components/ui/ProductCard';
import RatingStars from '../../components/ui/RatingStars';

export default function VendorStore() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('products');

  const vendor = vendors.find(v => v.id === Number(id));
  if (!vendor) return null;

  const vendorProducts = products.filter(p => p.vendorId === vendor.id);
  const BackIcon = isRTL ? ArrowRight2 : ArrowLeft2;
  const tabs = [
    { key: 'products', label: t.vendor.products },
    { key: 'about', label: t.vendor.about },
    { key: 'reviews', label: t.vendor.reviews },
  ];

  return (
    <div className="bg-mesh min-h-full -mt-14">
      {/* Banner */}
      <div className="relative h-48">
        <img src={vendor.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-14 start-5 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm border border-white/50 flex items-center justify-center z-10 active:scale-90 transition-transform shadow-soft"
        >
          <BackIcon size={18} variant="Outline" color="rgba(28,28,30,0.70)" />
        </button>
      </div>

      {/* Vendor info card */}
      <div className="px-5 -mt-10 relative z-10 mb-4">
        <div className="bg-white rounded-[22px] p-5 shadow-medium border border-white/60">
          <div className="flex items-start gap-3.5">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white p-[2px] flex-shrink-0 shadow-soft border border-white/60">
              <img src={vendor.logo} alt="" className="w-full h-full rounded-[14px] object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-[18px] font-semibold tracking-tight" style={{ color: '#1C1C1E' }}>
                  {lang === 'ar' ? vendor.nameAr : vendor.name}
                </h1>
                {vendor.verified && <TickCircle size={16} variant="Bold" color="#D4AF37" />}
              </div>
              <p className="text-[11px] mb-1.5" style={{ color: 'rgba(138,122,112,0.75)' }}>{vendor.category}</p>
              <RatingStars rating={vendor.rating} count={vendor.reviewCount} />
            </div>
          </div>
          <div className="flex gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(28,28,30,0.05)' }}>
            <div className="text-center flex-1">
              <p className="text-[16px] font-bold" style={{ color: '#7A1E2B' }}>{vendor.productCount}</p>
              <p className="text-[10px]" style={{ color: 'rgba(138,122,112,0.70)' }}>{t.vendor.products}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[16px] font-bold" style={{ color: '#D4AF37' }}>{vendor.rating}</p>
              <p className="text-[10px]" style={{ color: 'rgba(138,122,112,0.70)' }}>{t.product.rating}</p>
            </div>
            <div className="text-center flex-1">
              <p className="text-[16px] font-bold" style={{ color: '#1C1C1E' }}>{vendor.reviewCount}</p>
              <p className="text-[10px]" style={{ color: 'rgba(138,122,112,0.70)' }}>{t.vendor.reviews}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="px-5 mb-4">
        <div className="bg-white rounded-2xl p-1 flex shadow-soft border border-white/60">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex-1 py-2.5 rounded-xl text-[12px] font-semibold transition-all"
              style={{
                background: activeTab === tab.key ? '#7A1E2B' : 'transparent',
                color: activeTab === tab.key ? '#fff' : '#8E8E93',
                boxShadow: activeTab === tab.key ? '0 2px 8px rgba(122,30,43,0.20)' : 'none',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 pb-6">
        {activeTab === 'products' && (
          <div className="grid grid-cols-2 gap-3">
            {vendorProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            {vendorProducts.length === 0 && (
              <p className="col-span-2 text-center text-[13px] py-12" style={{ color: 'rgba(138,122,112,0.70)' }}>
                {lang === 'ar' ? 'لا توجد منتجات' : 'No products yet'}
              </p>
            )}
          </div>
        )}
        {activeTab === 'about' && (
          <div className="bg-white rounded-[20px] p-5 shadow-soft border border-white/60">
            <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(28,28,30,0.75)' }}>
              {lang === 'ar' ? vendor.descriptionAr : vendor.description}
            </p>
            <div
              className="mt-4 pt-4 flex items-center gap-2 text-[12px]"
              style={{ borderTop: '1px solid rgba(28,28,30,0.05)', color: 'rgba(138,122,112,0.75)' }}
            >
              <Location size={14} variant="Outline" color="#8A7A70" /> Muscat, Oman
            </div>
          </div>
        )}
        {activeTab === 'reviews' && (
          <div className="space-y-2.5">
            {[5, 4, 5, 3].map((r, i) => (
              <div key={i} className="bg-white rounded-[18px] p-4 shadow-soft border border-white/60">
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold"
                    style={{ background: 'rgba(122,30,43,0.07)', color: '#7A1E2B' }}
                  >
                    {['A', 'S', 'M', 'F'][i]}
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>
                      {['Ahmed', 'Sara', 'Mohammed', 'Fatima'][i]}
                    </p>
                    <RatingStars rating={r} size={9} showValue={false} />
                  </div>
                  <span className="text-[10px]" style={{ color: 'rgba(138,122,112,0.60)' }}>{i + 1}d ago</span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(138,122,112,0.80)' }}>
                  {['Great quality products!', 'Fast delivery and beautiful packaging.', 'Excellent customer service.', 'Good selection but shipping could be faster.'][i]}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
