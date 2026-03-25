import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { categories } from '../../data/categories';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();

  return (
    <div className="bg-mesh min-h-full px-5 py-4">
      <div className="grid grid-cols-2 gap-3">
        {categories.map((cat, i) => (
          <motion.button
            key={cat.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(`/products/${cat.id}`)}
            className="relative overflow-hidden text-start group rounded-[20px]"
            style={{ aspectRatio: '1/1.15' }}
          >
            {/* Background image */}
            <img
              src={cat.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover group-active:scale-105 transition-transform duration-500"
            />
            {/* Gradient overlay — darker for better text readability */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.05) 100%)' }} />
            {/* Shine line */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.20), transparent)' }} />

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-4">
              <span className="text-[24px] mb-2">{cat.icon}</span>
              <h3 className="text-[15px] font-bold text-white tracking-tight leading-tight">
                {lang === 'ar' ? cat.nameAr : cat.name}
              </h3>
              <p className="text-[10px] font-medium mt-0.5" style={{ color: 'rgba(255,255,255,0.55)' }}>
                {cat.count} {lang === 'ar' ? 'منتج' : 'items'}
              </p>
              {/* Subtle category count pill */}
              {cat.subcategories && (
                <div className="mt-2 self-start px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider" style={{ background: 'rgba(212,175,55,0.85)', color: '#fff' }}>
                  {cat.subcategories.length} {lang === 'ar' ? 'أقسام' : 'subcategories'}
                </div>
              )}
            </div>

            {/* Card shadow */}
            <div className="absolute inset-0 rounded-[20px]" style={{ boxShadow: 'inset 0 -1px 0 rgba(255,255,255,0.10), 0 4px 16px rgba(0,0,0,0.12)' }} />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
