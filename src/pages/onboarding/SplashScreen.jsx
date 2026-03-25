import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gift } from 'iconsax-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/onboarding'), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center relative overflow-hidden bg-gradient-maroon">
      {/* Ambient orbs */}
      <div className="absolute top-20 -start-20 w-64 h-64 rounded-full blur-[100px]" style={{ background: 'rgba(212,175,55,0.10)' }} />
      <div className="absolute bottom-28 -end-16 w-52 h-52 rounded-full blur-[80px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute top-1/3 end-10 w-36 h-36 rounded-full blur-[60px]" style={{ background: 'rgba(212,175,55,0.06)' }} />

      {/* Logo with concentric rings */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.9, type: 'spring', stiffness: 120, damping: 14 }}
        className="relative"
      >
        {/* Outer ring */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="absolute -inset-7 rounded-[38px]"
          style={{ border: '1px solid rgba(212,175,55,0.10)' }}
        />
        {/* Middle ring */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -inset-3.5 rounded-[30px]"
          style={{ border: '2px solid rgba(212,175,55,0.25)' }}
        />
        {/* Logo box */}
        <div
          className="w-28 h-28 rounded-3xl flex items-center justify-center"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(255,255,255,0.15)',
            boxShadow: '0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          <Gift size={48} variant="Bold" color="#D4AF37" />
        </div>
      </motion.div>

      {/* Brand text */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mt-10 text-center"
      >
        <h1 className="font-display text-[38px] font-light text-white tracking-[0.18em] leading-none">
          HADDIYA
        </h1>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 80 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="h-[1px] mx-auto mt-4 mb-3"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.50), transparent)' }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-[12px] tracking-[0.35em] font-medium uppercase"
          style={{ color: 'rgba(212,175,55,0.85)' }}
        >
          GIFT, GROW LOVE
        </motion.p>
      </motion.div>

      {/* Loading dots */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 flex gap-2"
      >
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
            className="w-[5px] h-[5px] rounded-full"
            style={{ background: '#D4AF37' }}
          />
        ))}
      </motion.div>
    </div>
  );
}
