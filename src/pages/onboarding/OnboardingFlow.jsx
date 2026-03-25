import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Shop, TruckFast, ArrowRight2, ArrowLeft2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../../components/ui/Button';

const slides = [
  {
    Icon: Gift,
    gradient: 'linear-gradient(155deg, #7A1E2B 0%, #9E3040 50%, #5A1520 100%)',
    accent: 'rgba(212,175,55,0.10)',
  },
  {
    Icon: Shop,
    gradient: 'linear-gradient(155deg, #2E4057 0%, #3D5A80 50%, #1A2A3F 100%)',
    accent: 'rgba(100,180,255,0.08)',
  },
  {
    Icon: TruckFast,
    gradient: 'linear-gradient(155deg, #5A3E1B 0%, #7A5A2B 50%, #3A2810 100%)',
    accent: 'rgba(212,175,55,0.10)',
  },
];

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const slideKeys = ['slide1', 'slide2', 'slide3'];
  const slide = slides[step];
  const slideKey = slideKeys[step];

  const handleNext = () => {
    if (step === 2) navigate('/home');
    else setStep(s => s + 1);
  };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col" style={{ background: slide.gradient }}>
      {/* Ambient orbs */}
      <div className="absolute top-16 -start-20 w-64 h-64 rounded-full blur-[100px]" style={{ background: slide.accent }} />
      <div className="absolute bottom-40 -end-16 w-52 h-52 rounded-full blur-[80px]" style={{ background: 'rgba(255,255,255,0.03)' }} />

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col px-7 pb-10">
        {/* Skip */}
        <div className="flex justify-end pt-14">
          <button
            onClick={() => navigate('/home')}
            className="text-white/50 text-[13px] font-medium px-3 py-1.5 rounded-xl active:bg-white/5 transition-colors"
          >
            {t.onboarding.skip}
          </button>
        </div>

        {/* Icon + Text */}
        <div className="flex-1 flex flex-col items-center justify-center -mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 28, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -28, scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center"
            >
              {/* Icon container */}
              <div
                className="w-[100px] h-[100px] rounded-[28px] flex items-center justify-center mb-10"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(24px)',
                  border: '1.5px solid rgba(255,255,255,0.12)',
                  boxShadow: '0 16px 48px rgba(0,0,0,0.20), inset 0 1px 0 rgba(255,255,255,0.08)',
                }}
              >
                <slide.Icon size={42} variant="Bold" color="#D4AF37" />
              </div>

              <h2 className="font-display text-[30px] font-semibold text-white text-center leading-tight mb-4 tracking-tight">
                {t.onboarding[`${slideKey}Title`]}
              </h2>
              <p className="text-white/50 text-center text-[14px] leading-relaxed max-w-[260px]">
                {t.onboarding[`${slideKey}Desc`]}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots + CTA */}
        <div className="flex flex-col items-center gap-8">
          {/* Step dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ width: i === step ? 28 : 8 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-[6px] rounded-full"
                style={{
                  background: i === step ? '#D4AF37' : 'rgba(255,255,255,0.20)',
                }}
              />
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleNext}
            className="w-full py-4 rounded-2xl text-[15px] font-bold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{
              background: '#D4AF37',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(212,175,55,0.25)',
            }}
          >
            {step === 2 ? t.onboarding.getStarted : t.onboarding.next}
            {step < 2 && (
              isRTL
                ? <ArrowLeft2 size={18} variant="Outline" />
                : <ArrowRight2 size={18} variant="Outline" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
