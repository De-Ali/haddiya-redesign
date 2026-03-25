import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TickCircle, Box1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import RatingStars from './RatingStars';

export default function VendorCard({ vendor, index = 0, compact = false }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  const name = lang === 'ar' ? vendor.nameAr : vendor.name;

  if (compact) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => navigate(`/vendor/${vendor.id}`)}
        className="flex flex-col items-center gap-2 min-w-[72px]"
      >
        <div className="w-[62px] h-[62px] rounded-2xl overflow-hidden bg-white border border-white/60 shadow-soft p-[2px]">
          <img src={vendor.logo} alt="" className="w-full h-full rounded-[14px] object-cover" />
        </div>
        <div className="text-center">
          <p className="text-[11px] font-semibold truncate max-w-[76px] tracking-tight leading-none" style={{ color: 'rgba(28,28,30,0.75)' }}>
            {name}
          </p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            <span className="text-[10px] font-bold" style={{ color: '#D4AF37' }}>{vendor.rating}</span>
            {vendor.verified && <TickCircle size={10} variant="Bold" color="#D4AF37" />}
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileTap={{ scale: 0.975 }}
      onClick={() => navigate(`/vendor/${vendor.id}`)}
      className="bg-white rounded-[22px] overflow-hidden cursor-pointer"
      style={{ boxShadow: '0 2px 16px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)' }}
    >
      <div className="h-24 relative overflow-hidden">
        <img src={vendor.banner} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
      <div className="px-4 pb-4 -mt-5 relative">
        <div className="w-12 h-12 rounded-[14px] overflow-hidden bg-white p-[2px] mb-2 shadow-medium border border-white/60">
          <img src={vendor.logo} alt="" className="w-full h-full rounded-[12px] object-cover" />
        </div>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-1">
              <h3 className="text-[14px] font-bold tracking-tight" style={{ color: '#1C1C1E' }}>{name}</h3>
              {vendor.verified && <TickCircle size={13} variant="Bold" color="#D4AF37" className="flex-shrink-0" />}
            </div>
            <div className="mt-1">
              <RatingStars rating={vendor.rating} size={11} count={vendor.reviewCount} />
            </div>
          </div>
          <div
            className="flex items-center gap-1 mt-1 px-2 py-1 rounded-lg"
            style={{ color: 'rgba(138,122,112,0.70)', background: 'rgba(28,28,30,0.03)' }}
          >
            <Box1 size={11} variant="Outline" color="#8A7A70" />
            <span className="text-[10px] font-semibold">{vendor.productCount}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
