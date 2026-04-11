import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, CloseCircle, Man, Woman, People, SearchNormal1 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { products } from '../../data/products';

const MAROON = '#7A1E2B';
const GOLD = '#D4AF37';

const genders = [
  { key: 'male', label: 'For Him', labelAr: 'له', Icon: Man, color: '#2C5F8A' },
  { key: 'female', label: 'For Her', labelAr: 'لها', Icon: Woman, color: '#C0392B' },
  { key: 'any', label: 'Anyone', labelAr: 'أي شخص', Icon: People, color: GOLD },
];

const ages = [
  { key: 'child', label: 'Child', labelAr: 'طفل', emoji: '🧒', range: '0-12' },
  { key: 'teen', label: 'Teen', labelAr: 'مراهق', emoji: '🧑', range: '13-19' },
  { key: 'adult', label: 'Adult', labelAr: 'بالغ', emoji: '🧑‍💼', range: '20-45' },
  { key: 'senior', label: 'Senior', labelAr: 'كبير', emoji: '👴', range: '45+' },
];

const budgets = [
  { key: 'low', label: 'Under 25', labelAr: 'أقل من 25', max: 25 },
  { key: 'mid', label: '25 - 75', labelAr: '25 - 75', max: 75 },
  { key: 'high', label: '75 - 150', labelAr: '75 - 150', max: 150 },
  { key: 'luxury', label: '150+', labelAr: '150+', max: 9999 },
];

export default function GiftAssistant() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0); // 0=gender, 1=age, 2=budget, 3=results
  const [gender, setGender] = useState(null);
  const [age, setAge] = useState(null);
  const [budget, setBudget] = useState(null);
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const isAr = lang === 'ar';
  const [scrolledDown, setScrolledDown] = useState(false);

  useEffect(() => {
    const scrollEl = document.querySelector('[class*="overflow-y-auto"]');
    if (!scrollEl) return;
    const handler = () => setScrolledDown(scrollEl.scrollTop > 200);
    scrollEl.addEventListener('scroll', handler, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handler);
  }, []);

  const reset = () => { setStep(0); setGender(null); setAge(null); setBudget(null); };

  const filteredProducts = products.filter(p => {
    if (!budget) return true;
    const b = budgets.find(b => b.key === budget);
    return p.price <= (b?.max || 9999);
  }).slice(0, 4);

  const StepIndicator = () => (
    <div className="flex gap-1.5 justify-center mb-5">
      {[0, 1, 2].map(i => (
        <div key={i} className="h-[3px] rounded-full transition-all" style={{ width: i === step ? 24 : 8, background: i <= step ? MAROON : '#EDE8E1' }} />
      ))}
    </div>
  );

  return (
    <>
      {/* ── Floating Buttons (Search + Gift AI) ── */}
      <AnimatePresence>
        {!open && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="fixed z-[60] flex flex-col gap-2.5"
            style={{ bottom: 82, right: 16 }}
          >
            {/* Search — only visible on scroll */}
            <AnimatePresence>
              {scrolledDown && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigate('/search')}
                  className="flex items-center justify-center"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '1px solid rgba(0,0,0,0.06)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                  }}
                >
                  <SearchNormal1 size={18} variant="Outline" color={MAROON} />
                </motion.button>
              )}
            </AnimatePresence>
            {/* Gift AI */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => { setOpen(true); reset(); }}
              className="flex items-center justify-center"
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${MAROON}, ${GOLD})`,
                boxShadow: '0 4px 20px rgba(122,30,43,0.30)',
              }}
            >
              <Gift size={18} variant="Bold" color="#FFFFFF" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[70]"
              style={{ background: 'rgba(0,0,0,0.4)' }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[71] max-w-[430px] mx-auto"
              style={{
                background: '#FFFFFF',
                borderRadius: '24px 24px 0 0',
                maxHeight: '75dvh',
                boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
              }}
            >
              {/* Handle + Header */}
              <div className="flex items-center justify-between px-5 pt-3 pb-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${MAROON}, ${GOLD})` }}>
                    <Gift size={16} variant="Bold" color="#fff" />
                  </div>
                  <div>
                    <p className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                      {isAr ? 'مساعد الهدايا' : 'Gift Assistant'}
                    </p>
                    <p className="text-[10px]" style={{ color: '#AEAEB2' }}>
                      {isAr ? 'دعني أساعدك في اختيار الهدية المثالية' : 'Let me help you find the perfect gift'}
                    </p>
                  </div>
                </div>
                <button onClick={() => setOpen(false)} className="active:scale-90 transition-transform">
                  <CloseCircle size={24} variant="Outline" color="#AEAEB2" />
                </button>
              </div>

              <div className="h-px" style={{ background: '#EDE8E1' }} />

              {/* Content */}
              <div className="px-5 py-5" style={{ maxHeight: '60dvh', overflowY: 'auto' }}>
                <AnimatePresence mode="wait">

                  {/* Step 0: Gender */}
                  {step === 0 && (
                    <motion.div key="gender" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <StepIndicator />
                      <p className="text-[15px] font-bold text-center mb-1" style={{ color: '#1A1A1A' }}>
                        {isAr ? 'لمن الهدية؟' : 'Who is the gift for?'}
                      </p>
                      <p className="text-[12px] text-center mb-5" style={{ color: '#AEAEB2' }}>
                        {isAr ? 'اختر الجنس' : 'Select gender'}
                      </p>
                      <div className="flex gap-3">
                        {genders.map(g => (
                          <button
                            key={g.key}
                            onClick={() => { setGender(g.key); setStep(1); }}
                            className="flex-1 flex flex-col items-center gap-2 py-5 rounded-2xl active:scale-95 transition-all"
                            style={{ background: `${g.color}08`, border: `1.5px solid ${g.color}20` }}
                          >
                            <g.Icon size={28} variant="Outline" color={g.color} />
                            <span className="text-[12px] font-semibold" style={{ color: g.color }}>{isAr ? g.labelAr : g.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 1: Age */}
                  {step === 1 && (
                    <motion.div key="age" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <StepIndicator />
                      <p className="text-[15px] font-bold text-center mb-1" style={{ color: '#1A1A1A' }}>
                        {isAr ? 'ما هو العمر؟' : 'What age group?'}
                      </p>
                      <p className="text-[12px] text-center mb-5" style={{ color: '#AEAEB2' }}>
                        {isAr ? 'اختر الفئة العمرية' : 'Select age range'}
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                        {ages.map(a => (
                          <button
                            key={a.key}
                            onClick={() => { setAge(a.key); setStep(2); }}
                            className="flex flex-col items-center gap-2 py-4 rounded-2xl active:scale-95 transition-all"
                            style={{ background: '#FAF8F5', border: '1.5px solid #EDE8E1' }}
                          >
                            <span className="text-[24px]">{a.emoji}</span>
                            <span className="text-[12px] font-semibold" style={{ color: '#1A1A1A' }}>{isAr ? a.labelAr : a.label}</span>
                            <span className="text-[10px]" style={{ color: '#AEAEB2' }}>{a.range}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2: Budget */}
                  {step === 2 && (
                    <motion.div key="budget" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <StepIndicator />
                      <p className="text-[15px] font-bold text-center mb-1" style={{ color: '#1A1A1A' }}>
                        {isAr ? 'ما هي الميزانية؟' : 'What\'s your budget?'}
                      </p>
                      <p className="text-[12px] text-center mb-5" style={{ color: '#AEAEB2' }}>
                        {isAr ? 'بالريال العماني' : 'In OMR'}
                      </p>
                      <div className="space-y-2.5">
                        {budgets.map(b => (
                          <button
                            key={b.key}
                            onClick={() => { setBudget(b.key); setStep(3); }}
                            className="w-full py-4 rounded-2xl text-[14px] font-semibold active:scale-[0.98] transition-all"
                            style={{ background: '#FAF8F5', border: '1.5px solid #EDE8E1', color: '#1A1A1A' }}
                          >
                            {isAr ? b.labelAr : b.label} OMR
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3: Results */}
                  {step === 3 && (
                    <motion.div key="results" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Gift size={18} variant="Bold" color={MAROON} />
                        <p className="text-[14px] font-bold" style={{ color: '#1A1A1A' }}>
                          {isAr ? 'هدايا مقترحة لك' : 'Gift suggestions for you'}
                        </p>
                      </div>
                      <div className="space-y-2.5">
                        {filteredProducts.map(p => (
                          <button
                            key={p.id}
                            onClick={() => { setOpen(false); navigate(`/product/${p.id}`); }}
                            className="w-full flex items-center gap-3 p-3 rounded-2xl active:scale-[0.98] transition-all"
                            style={{ background: '#FAF8F5', border: '1px solid #EDE8E1' }}
                          >
                            <img src={p.image} alt="" className="w-14 h-14 rounded-xl object-cover flex-shrink-0" style={{ background: '#EDE8E1' }} />
                            <div className="flex-1 text-start min-w-0">
                              <p className="text-[13px] font-semibold truncate" style={{ color: '#1A1A1A' }}>{isAr ? p.nameAr : p.name}</p>
                              <p className="text-[14px] font-bold" style={{ color: MAROON }}>{p.price.toFixed(3)} <span className="text-[10px] font-medium" style={{ color: '#AEAEB2' }}>OMR</span></p>
                            </div>
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={reset}
                        className="w-full mt-4 py-3 rounded-2xl text-[13px] font-semibold active:scale-[0.98] transition-all"
                        style={{ background: MAROON, color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' }}
                      >
                        {isAr ? 'بحث مرة أخرى' : 'Search Again'}
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
