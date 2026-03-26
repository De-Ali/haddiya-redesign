import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, TruckFast, ArrowRotateLeft } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1545243424-0ce743321e11?w=800&h=1200&fit=crop&q=80',
    title: 'Find the Perfect Gift',
    titleAr: 'اعثر على الهدية المثالية',
    subtitle: 'For every occasion, every person, every moment.',
    subtitleAr: 'لكل مناسبة، لكل شخص، لكل لحظة.',
  },
  {
    image: 'https://images.unsplash.com/photo-1633163947545-85beac03dc21?w=800&h=1200&fit=crop&q=80',
    title: 'Unique Omani Gifts',
    titleAr: 'هدايا عمانية فريدة',
    subtitle: 'Curated collection of luxury gifts from the finest brands.',
    subtitleAr: 'مجموعة مختارة من الهدايا الفاخرة من أرقى العلامات.',
  },
  {
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=1200&fit=crop&q=80',
    title: 'Beautiful Packaging.\nFast Delivery.',
    titleAr: 'تغليف أنيق.\nتوصيل سريع.',
    subtitle: 'Gift-wrapped and delivered across Oman.',
    subtitleAr: 'مغلفة بعناية وتُوصل في جميع أنحاء عمان.',
    features: [
      { Icon: Gift, label: 'Gift Wrap', labelAr: 'تغليف' },
      { Icon: TruckFast, label: 'Same Day', labelAr: 'نفس اليوم' },
      { Icon: ArrowRotateLeft, label: 'Returns', labelAr: 'إرجاع' },
    ],
  },
];

export default function OnboardingFlow() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';

  const slide = slides[step];

  const handleNext = () => {
    if (step === 2) navigate('/login');
    else setStep(s => s + 1);
  };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col" style={{ background: '#000' }}>
      {/* Background image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay gradient from bottom */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Skip button */}
      <div className="relative z-10 flex justify-end px-6 pt-14">
        <button
          onClick={() => navigate('/login')}
          className="text-white/70 text-[14px] font-medium px-3 py-1.5 rounded-xl active:bg-white/10 transition-colors"
        >
          {isAr ? 'تخطي' : 'Skip'}
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom content panel — full width */}
      <div className="relative z-10 px-4 pb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {/* Glass panel */}
            <div
              className="w-full rounded-[24px] px-5 pt-7 pb-6"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {/* Title */}
              <h2
                className="text-center leading-tight mb-2"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', fontWeight: 700, color: '#FFFFFF', whiteSpace: 'pre-line' }}
              >
                {isAr ? slide.titleAr : slide.title}
              </h2>

              {/* Subtitle */}
              <p className="text-center text-[13px] leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.6)' }}>
                {isAr ? slide.subtitleAr : slide.subtitle}
              </p>

              {/* Features (last slide only) */}
              {slide.features && (
                <div className="flex justify-center gap-8 mb-5">
                  {slide.features.map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div
                        className="w-[48px] h-[48px] rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}
                      >
                        <f.Icon size={20} variant="Outline" color="#FFFFFF" />
                      </div>
                      <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.6)' }}>
                        {isAr ? f.labelAr : f.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Dots */}
              <div className="flex justify-center gap-2 mb-5">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setStep(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === step ? 24 : 8,
                      height: 8,
                      background: i === step ? '#D4AF37' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                ))}
              </div>

              {/* CTA button */}
              <button
                onClick={handleNext}
                className="w-full py-4 rounded-full text-[15px] font-bold active:scale-[0.98] transition-transform"
                style={{ background: '#7A1E2B', color: '#FFFFFF', boxShadow: '0 6px 20px rgba(122,30,43,0.35)' }}
              >
                {step === 2
                  ? (isAr ? 'ابدأ التسوق' : 'Start Shopping')
                  : (isAr ? 'التالي' : 'Next')
                }
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
