import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown2 } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

const countryCodes = [
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+44', flag: '🇬🇧', name: 'UK' },
  { code: '+1', flag: '🇺🇸', name: 'USA' },
];

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const [phone, setPhone] = useState('');
  const [selected, setSelected] = useState(countryCodes[0]);
  const [showPicker, setShowPicker] = useState(false);
  const isAr = lang === 'ar';
  const returnTo = location.state?.returnTo;

  const handleRequest = () => {
    if (phone.length >= 8) {
      navigate('/otp', { state: { phone: `${selected.code}${phone}`, returnTo } });
    }
  };

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#FFFFFF' }}>
      {/* ── Top curved section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div
          style={{
            background: '#F5F0EB',
            height: 140,
            borderRadius: '0 0 50% 50% / 0 0 40px 40px',
          }}
        />
      </motion.div>

      {/* ── Form content ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col px-6 pt-10"
      >
        <label style={{ fontSize: 15, fontWeight: 700, color: '#1A1A1A', display: 'block', marginBottom: 12 }}>
          {isAr ? 'رقم الواتساب' : 'Whatsapp Number'}
        </label>

        {/* Phone input row */}
        <div style={{ display: 'flex', gap: 10 }}>
          <input
            type="tel"
            inputMode="numeric"
            value={phone}
            onChange={e => setPhone(e.target.value.replace(/\D/g, '').slice(0, 8))}
            placeholder={isAr ? 'أدخل رقمك' : ''}
            style={{
              flex: 1, background: '#FFFFFF', border: '1px solid #EDE8E1',
              borderRadius: 16, padding: '16px 18px', fontSize: 16,
              fontWeight: 500, color: '#1A1A1A', outline: 'none',
            }}
          />

          {/* Country code selector */}
          <button
            onClick={() => setShowPicker(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6, background: '#FFFFFF',
              border: '1px solid #EDE8E1', borderRadius: 16, padding: '16px 14px',
              fontSize: 16, fontWeight: 600, color: '#1A1A1A', cursor: 'pointer', flexShrink: 0,
            }}
          >
            <ArrowDown2 size={14} variant="Outline" color="#8A7A70" />
            <span>{selected.code}</span>
          </button>
        </div>
      </motion.div>

      {/* ── Bottom button ── */}
      <div style={{ padding: '16px 24px 40px' }}>
        <button
          onClick={handleRequest}
          disabled={phone.length < 8}
          className="active:scale-[0.98] transition-all"
          style={{
            width: '100%', height: 56, borderRadius: 16,
            background: phone.length >= 8 ? '#7A1E2B' : '#EDE8E1',
            color: phone.length >= 8 ? '#FFFFFF' : '#8A7A70',
            fontSize: 16, fontWeight: 600, border: 'none',
            cursor: phone.length >= 8 ? 'pointer' : 'default',
            boxShadow: phone.length >= 8 ? '0 4px 16px rgba(122,30,43,0.25)' : 'none',
          }}
        >
          {isAr ? 'طلب رمز التفعيل' : 'Request activation code'}
        </button>
      </div>

      {/* ── Country Code Picker Bottom Sheet ── */}
      <AnimatePresence>
        {showPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPicker(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 80 }}
            />
            <motion.div
              initial={{ translateY: '100%' }}
              animate={{ translateY: '0%' }}
              exit={{ translateY: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              style={{
                position: 'fixed', bottom: 0, left: 0, right: 0,
                width: '100%', maxWidth: 430, margin: '0 auto',
                background: '#FFFFFF', zIndex: 81,
                borderRadius: '24px 24px 0 0', paddingBottom: 40,
                boxShadow: '0 -4px 20px rgba(0,0,0,0.1)',
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 8px' }}>
                <div style={{ width: 40, height: 4, borderRadius: 50, background: '#EDE8E1' }} />
              </div>

              <p style={{ fontSize: 16, fontWeight: 700, color: '#1A1A1A', padding: '8px 24px 12px' }}>
                {isAr ? 'اختر رمز الدولة' : 'Select Country Code'}
              </p>

              <div style={{ maxHeight: 320, overflowY: 'auto', padding: '0 12px' }}>
                {countryCodes.map(cc => (
                  <button
                    key={cc.code}
                    onClick={() => { setSelected(cc); setShowPicker(false); }}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                      padding: '14px 12px', borderRadius: 12, border: 'none',
                      background: selected.code === cc.code ? 'rgba(122,30,43,0.05)' : 'transparent',
                      cursor: 'pointer', textAlign: 'start',
                      borderBottom: '1px solid rgba(0,0,0,0.03)',
                    }}
                  >
                    <span style={{ fontSize: 24 }}>{cc.flag}</span>
                    <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: '#1A1A1A' }}>{cc.name}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#8A7A70' }}>{cc.code}</span>
                    {selected.code === cc.code && (
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7A1E2B' }} />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
