import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const seen = localStorage.getItem('haddiya_onboarded');
    const timer = setTimeout(() => navigate(seen ? '/home' : '/onboarding'), 2800);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-full flex-1 flex flex-col items-center justify-center relative overflow-hidden" style={{ background: '#FFFFFF' }}>
      {/* Logo image */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100, damping: 15 }}
        className="flex flex-col items-center"
      >
        <img src={`${import.meta.env.BASE_URL}haddiya-logo.png`} alt="Haddiya" className="w-[180px] h-[180px] object-contain" />
      </motion.div>

      {/* Brand name */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-4 text-center"
        style={{ fontFamily: 'var(--font-display)', fontSize: '42px', fontWeight: 600, color: '#7A1E2B', letterSpacing: '0.02em' }}
      >
        Haddiya
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        style={{ fontFamily: 'var(--font-display)', fontSize: '16px', fontWeight: 400, fontStyle: 'italic', color: '#D4AF37', marginTop: '4px' }}
      >
        The Art of Gifting
      </motion.p>

      {/* Bottom gold line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ width: '80%', height: '2px', background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)', transformOrigin: 'center' }}
      />

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
