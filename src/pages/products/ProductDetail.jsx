import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Heart, Share, ArrowLeft2, ArrowRight2,
  Star1, Minus, Add, Bag2, TickCircle,
} from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { vendors } from '../../data/vendors';
import ProductCard from '../../components/ui/ProductCard';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { lang, t, isRTL } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [qty, setQty] = useState(1);

  const product = products.find(p => p.id === Number(id));
  if (!product) return null;

  const vendor = vendors.find(v => v.id === product.vendorId);
  const related = products.filter(p => p.categoryId === product.categoryId && p.id !== product.id).slice(0, 4);
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;
  const BackIcon = isRTL ? ArrowRight2 : ArrowLeft2;

  return (
    <div className="bg-bg min-h-full">
      {/* ── Image Gallery ── */}
      <div className="relative aspect-square bg-bg-warm overflow-hidden">
        <motion.img
          key={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          src={product.images[activeImage]}
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />

        {/* Top actions */}
        <div className="absolute top-4 left-0 right-0 px-5 flex items-center justify-between z-10" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform"
            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
          >
            <BackIcon size={18} variant="Outline" color="#1C1C1E" />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <Heart size={18} variant={wishlisted ? 'Bold' : 'Outline'} color={wishlisted ? '#7A1E2B' : '#3C3C43'} />
            </button>
            <button
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center active:scale-90 transition-transform"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid rgba(0,0,0,0.06)' }}
            >
              <Share size={16} variant="Outline" color="#3C3C43" />
            </button>
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-14 start-[72px] flex gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-wider uppercase text-white" style={{ background: 'rgba(122,30,43,0.90)' }}>NEW</span>
          )}
          {discount && (
            <span className="px-2.5 py-1 rounded-lg text-[9px] font-bold text-white" style={{ background: 'rgba(255,59,48,0.90)' }}>-{discount}%</span>
          )}
        </div>

        {/* Thumbnails */}
        {product.images.length > 1 && (
          <div className="absolute bottom-6 end-5 flex gap-1.5 z-10">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className="w-12 h-12 rounded-xl overflow-hidden transition-all"
                style={{
                  border: i === activeImage ? '2px solid #7A1E2B' : '2px solid rgba(255,255,255,0.60)',
                  opacity: i === activeImage ? 1 : 0.7,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
                }}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Product Info ── */}
      <div className="px-5 -mt-5 relative z-10 pb-8">
        <div className="bg-white rounded-[22px] p-5" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.03)' }}>
          {/* Vendor */}
          {vendor && (
            <button onClick={(e) => { e.stopPropagation(); navigate(`/vendor/${vendor.id}`); }} className="flex items-center gap-2 mb-3">
              <img src={vendor.logo} alt="" className="w-6 h-6 rounded-lg object-cover" />
              <span className="text-[11px] font-medium" style={{ color: '#AEAEB2' }}>Sold by</span>
              <span className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? vendor.nameAr : vendor.name}</span>
              {vendor.verified && <TickCircle size={12} variant="Bold" color="#D4AF37" />}
            </button>
          )}

          {/* Name */}
          <h1 className="font-display text-[22px] font-semibold text-dark leading-tight mb-2 tracking-tight">
            {lang === 'ar' ? product.nameAr : product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-3">
            <div className="flex gap-[2px]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star1 key={star} size={13} variant={star <= Math.round(product.rating) ? 'Bold' : 'Outline'} color={star <= Math.round(product.rating) ? '#D4AF37' : '#E0E0E0'} />
              ))}
            </div>
            <span className="text-[11px] font-medium" style={{ color: '#AEAEB2' }}>({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="text-[24px] font-bold text-primary tracking-tight">{product.price.toFixed(3)}</span>
            <span className="text-[12px] font-medium" style={{ color: '#AEAEB2' }}>OMR</span>
            {product.originalPrice && (
              <span className="text-[13px] line-through" style={{ color: '#C7C7CC' }}>{product.originalPrice.toFixed(3)}</span>
            )}
            {discount && (
              <span className="text-[11px] font-bold text-success px-2 py-0.5 rounded-lg" style={{ background: 'rgba(52,199,89,0.08)' }}>{discount}% OFF</span>
            )}
          </div>

          {/* Variants */}
          {product.variants.length > 0 && product.variants.map(v => {
            const colorSwatchMap = {
              'Red': '#C0392B', 'Pink': '#E8A0BF', 'White': '#F5F5F5', 'Black': '#1C1C1E',
              'Tan': '#D2B48C', 'Burgundy': '#7A1E2B', 'Gold': '#D4AF37', 'Rose Gold': '#B76E79',
              'Silver': '#C0C0C0', 'Brown': '#8B4513', 'Blue': '#2C5F8A', 'Green': '#2D6A4F',
            };
            const isColorType = v.type === 'Color' || v.type === 'Metal';

            return (
              <div key={v.type} className="mb-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>{v.type}</p>
                  {isColorType && selectedVariant && (
                    <span className="text-[11px] font-medium" style={{ color: '#8E8E93' }}>{selectedVariant}</span>
                  )}
                </div>
                <div className="flex gap-2.5 flex-wrap">
                  {v.options.map(opt => {
                    const isSelected = selectedVariant === opt;
                    if (isColorType && colorSwatchMap[opt]) {
                      return (
                        <button
                          key={opt}
                          onClick={() => setSelectedVariant(opt)}
                          className="relative w-9 h-9 rounded-full transition-all active:scale-90"
                          style={{
                            background: colorSwatchMap[opt],
                            boxShadow: isSelected ? `0 0 0 2.5px #F5F0EB, 0 0 0 4.5px #7A1E2B` : '0 1px 4px rgba(0,0,0,0.10)',
                            border: opt === 'White' ? '1px solid rgba(0,0,0,0.08)' : 'none',
                          }}
                        >
                          {isSelected && (
                            <svg className="absolute inset-0 m-auto" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={opt === 'White' || opt === 'Silver' ? '#1C1C1E' : '#fff'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"/>
                            </svg>
                          )}
                        </button>
                      );
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => setSelectedVariant(opt)}
                        className="px-4 py-2 rounded-xl text-[12px] font-medium transition-all"
                        style={{
                          background: isSelected ? '#7A1E2B' : 'transparent',
                          color: isSelected ? '#fff' : '#1C1C1E',
                          border: isSelected ? '1.5px solid #7A1E2B' : '1.5px solid rgba(0,0,0,0.08)',
                        }}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Quantity */}
          <div className="flex items-center justify-between mb-5">
            <p className="text-[12px] font-semibold" style={{ color: '#1C1C1E' }}>{lang === 'ar' ? 'الكمية' : 'Quantity'}</p>
            <div className="flex items-center rounded-xl overflow-hidden" style={{ border: '1.5px solid rgba(0,0,0,0.08)' }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center active:bg-black/[0.03]">
                <Minus size={14} variant="Outline" color="#7A1E2B" />
              </button>
              <span className="w-10 text-center text-[14px] font-semibold" style={{ color: '#1C1C1E' }}>{String(qty).padStart(2, '0')}</span>
              <button onClick={() => setQty(q => q + 1)} className="w-10 h-10 flex items-center justify-center active:bg-black/[0.03]">
                <Add size={14} variant="Outline" color="#7A1E2B" />
              </button>
            </div>
          </div>

          {/* Actions — compact modern buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => { addToCart(product, selectedVariant); navigate('/cart'); }}
              className="flex-1 h-[48px] rounded-[14px] flex items-center justify-center gap-2 text-[13px] font-semibold active:scale-[0.97] transition-transform"
              style={{ background: '#fff', color: '#1C1C1E', border: '1.5px solid rgba(0,0,0,0.08)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <Bag2 size={16} variant="Outline" color="#1C1C1E" />
              {t.product.addToCart}
            </button>
            <button
              onClick={() => { addToCart(product, selectedVariant); navigate('/checkout'); }}
              className="flex-1 h-[48px] rounded-[14px] flex items-center justify-center gap-2 text-[13px] font-bold active:scale-[0.97] transition-transform"
              style={{ background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
            >
              {t.product.buyNow}
            </button>
          </div>
        </div>

        {/* ── Description ── */}
        <div className="bg-white rounded-[20px] p-5 mt-3" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.03)' }}>
          <h3 className="text-[13px] font-semibold mb-2" style={{ color: '#1C1C1E' }}>{t.product.description}</h3>
          <p className="text-[12px] leading-relaxed" style={{ color: '#8E8E93' }}>
            {lang === 'ar' ? product.descriptionAr : product.description}
          </p>
        </div>

        {/* ── Related ── */}
        {related.length > 0 && (
          <div className="mt-5 mb-2">
            <h3 className="font-display text-[18px] font-semibold text-dark mb-3 tracking-tight">{t.product.related}</h3>
            <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1 -mx-5 px-5">
              {related.map((p, i) => (
                <div key={p.id} className="min-w-[155px] max-w-[155px] flex-shrink-0">
                  <ProductCard product={p} index={i} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
