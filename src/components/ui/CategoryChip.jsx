import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function CategoryChip({ category, index = 0 }) {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileTap={{ scale: 0.92 }}
      onClick={() => navigate(`/products/${category.id}`)}
      className="flex flex-col items-center gap-2 min-w-[68px]"
    >
      <div
        className="w-[60px] h-[60px] rounded-2xl flex items-center justify-center text-[22px] active:scale-95 transition-transform"
        style={{
          background: `linear-gradient(145deg, ${category.color}18, ${category.color}08)`,
          border: `1px solid ${category.color}15`,
        }}
      >
        {category.icon}
      </div>
      <span
        className="text-[11px] font-medium truncate max-w-[72px] tracking-tight leading-none"
        style={{ color: 'rgba(28,28,30,0.55)' }}
      >
        {lang === 'ar' ? category.nameAr : category.name}
      </span>
    </motion.button>
  );
}
