import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Bag2, Star1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useCart } from '../../context/CartContext';
import { vendors } from '../../data/vendors';

function RotatingBadge({ isNew, discount }) {
  const badges = [];
  if (isNew) badges.push({ text: 'NEW', bg: 'rgba(122,30,43,0.90)' });
  if (discount) badges.push({ text: `-${discount}%`, bg: 'rgba(255,59,48,0.90)' });
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (badges.length <= 1) return;
    const t = setInterval(() => setActive(p => (p + 1) % badges.length), 2500);
    return () => clearInterval(t);
  }, [badges.length]);

  if (badges.length === 0) return null;
  const b = badges[active];

  return (
    <div className="absolute top-2.5 start-2.5">
      <AnimatePresence mode="wait">
        <motion.span
          key={b.text}
          initial={{ opacity: 0, y: -6, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 6, scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="px-2.5 py-[4px] rounded-lg text-[9px] font-bold tracking-wider uppercase text-white backdrop-blur-sm inline-block"
          style={{ background: b.bg }}
        >
          {b.text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export default function ProductCard({ product, index = 0 }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { addToCart, toggleWishlist, isInWishlist } = useCart();

  const vendor = vendors.find(v => v.id === product.vendorId);
  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const displayName = lang === 'ar' ? product.nameAr : product.name;
  const vendorName = vendor ? (lang === 'ar' ? vendor.nameAr : vendor.name) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.975 }}
      className="bg-white rounded-[20px] overflow-hidden cursor-pointer group"
      style={{
        boxShadow: '0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)',
      }}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* ── Image ── */}
      <div className="relative aspect-[4/5] overflow-hidden bg-bg-warm">
        <img
          src={product.image}
          alt={displayName}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Badge — single rotating tag */}
        <RotatingBadge isNew={product.isNew} discount={discount} />

        {/* Wishlist + Cart — top end */}
        <div className="absolute top-2.5 end-2.5 flex flex-col gap-1.5">
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className="w-8 h-8 rounded-full flex items-center justify-center active:scale-85 transition-all"
            style={{
              background: wishlisted ? 'rgba(122,30,43,0.92)' : 'rgba(255,255,255,0.80)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.30)',
            }}
          >
            <Heart
              size={14}
              variant={wishlisted ? 'Bold' : 'Outline'}
              color={wishlisted ? '#fff' : 'rgba(28,28,30,0.45)'}
            />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); addToCart(product); }}
            className="w-8 h-8 rounded-full flex items-center justify-center active:scale-85 transition-all"
            style={{
              background: 'rgba(122,30,43,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <Bag2 size={14} variant="Bold" color="#FFFFFF" />
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-3.5 pt-3">
        {/* Vendor */}
        {vendor && (
          <div className="flex items-center gap-1.5 mb-1.5">
            <img
              src={vendor.logo}
              alt={vendorName}
              className="w-[14px] h-[14px] rounded object-cover"
            />
            <span className="text-[10px] font-medium truncate leading-none" style={{ color: '#AEAEB2' }}>
              {vendorName}
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="text-[13px] font-semibold text-dark leading-snug line-clamp-2 mb-1.5 tracking-[-0.01em]">
          {displayName}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex gap-[2px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star1
                key={star}
                size={10}
                variant={star <= Math.round(product.rating) ? 'Bold' : 'Outline'}
                color={star <= Math.round(product.rating) ? '#D4AF37' : 'rgba(28,28,30,0.15)'}
              />
            ))}
          </div>
          <span className="text-[9px] font-medium" style={{ color: '#AEAEB2' }}>
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-[15px] font-bold text-primary tracking-tight">
            {product.price.toFixed(3)}
          </span>
          <span className="text-[9px] font-semibold uppercase tracking-wider" style={{ color: '#B87D88' }}>
            OMR
          </span>
          {product.originalPrice && (
            <span className="text-[10px] line-through ms-auto" style={{ color: '#C7C7CC' }}>
              {product.originalPrice.toFixed(3)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
