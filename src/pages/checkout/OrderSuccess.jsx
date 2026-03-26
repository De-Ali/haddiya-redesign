import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box1, ArrowRight2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/ui/Button';

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="bg-mesh flex flex-col items-center justify-center px-7 text-center" style={{ minHeight: 'calc(100vh - 80px)', paddingTop: 40 }}>
      {/* Celebration icon */}
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 15, delay: 0.2 }}
        className="relative mb-9"
      >
        <img src={`${import.meta.env.BASE_URL}haddiya-logo.png`} alt="Haddiya" className="w-28 h-28 object-contain" />

        {/* Check badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 300 }}
          className="absolute -top-2 -end-2 w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: '#D4AF37', boxShadow: '0 4px 12px rgba(212,175,55,0.30)' }}
        >
          <span className="text-white text-[18px] font-bold">✓</span>
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.05, 0.25] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -inset-4 rounded-[32px]"
          style={{ border: '2px solid rgba(212,175,55,0.20)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.03, 0.15] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="absolute -inset-8 rounded-[38px]"
          style={{ border: '1px solid rgba(212,175,55,0.10)' }}
        />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="font-display text-[26px] font-semibold mb-2 tracking-tight"
        style={{ color: '#1C1C1E' }}
      >
        {t.orderSuccess.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-[13px] mb-8 max-w-[250px] leading-relaxed"
        style={{ color: 'rgba(142,142,147,0.80)' }}
      >
        {t.orderSuccess.subtitle}
      </motion.p>

      {/* Order number card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-[20px] p-5 mb-8 w-full shadow-soft border border-white/60"
      >
        <p className="text-[11px] mb-1 font-medium" style={{ color: 'rgba(142,142,147,0.70)' }}>
          {t.orderSuccess.orderNumber}
        </p>
        <p className="text-[18px] font-bold tracking-wider font-display" style={{ color: '#1C1C1E' }}>
          #HD-20260323-001
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="w-full space-y-3"
      >
        <Button variant="primary" size="full" icon={<Box1 size={17} variant="Outline" />}>
          {t.orderSuccess.trackOrder}
        </Button>
        <Button variant="secondary" size="full" onClick={() => navigate('/home')} iconRight={<ArrowRight2 size={16} variant="Outline" />}>
          {t.orderSuccess.continueShopping}
        </Button>
      </motion.div>
    </div>
  );
}
