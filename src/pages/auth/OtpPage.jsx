import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldTick } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

export default function OtpPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) refs[index + 1].current.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      refs[index - 1].current.focus();
    }
  };

  const isFilled = otp.every(d => d);

  return (
    <div
      className="flex-1 relative overflow-hidden flex flex-col items-center justify-center px-7"
      style={{ background: 'linear-gradient(155deg, #8A2232 0%, #6A1825 30%, #4A1018 60%, #2A0A10 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-24 -end-20 w-56 h-56 rounded-full blur-[100px]" style={{ background: 'rgba(212,175,55,0.08)' }} />

      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center w-full relative z-10"
      >
        {/* Icon */}
        <div
          className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-7"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            border: '1.5px solid rgba(255,255,255,0.12)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.20)',
          }}
        >
          <ShieldTick size={36} variant="Bold" color="#D4AF37" />
        </div>

        <h1 className="font-display text-[28px] font-semibold text-white mb-2 tracking-tight">
          {t.auth.otp}
        </h1>
        <p className="text-white/40 text-[13px] mb-10 max-w-[240px] mx-auto leading-relaxed">
          {t.auth.otpSent}
        </p>

        {/* OTP inputs */}
        <div className="flex gap-3.5 justify-center mb-10">
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={refs[i]}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-[60px] h-[60px] rounded-2xl text-center text-[22px] font-bold text-white outline-none transition-all"
              style={{
                background: digit ? 'rgba(212,175,55,0.18)' : 'rgba(255,255,255,0.12)',
                border: digit ? '2px solid rgba(212,175,55,0.50)' : '1.5px solid rgba(255,255,255,0.22)',
                boxShadow: digit ? '0 0 0 4px rgba(212,175,55,0.08)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-all"
          style={{
            background: isFilled ? '#D4AF37' : 'rgba(212,175,55,0.25)',
            color: '#fff',
            boxShadow: isFilled ? '0 8px 24px rgba(212,175,55,0.25)' : 'none',
            opacity: isFilled ? 1 : 0.7,
          }}
        >
          {t.auth.verify}
        </button>

        {/* Resend */}
        <p className="text-white/35 text-[12px] mt-7">
          {lang === 'ar' ? 'لم تستلم الرمز؟' : "Didn't receive the code?"}{' '}
          <button className="font-semibold" style={{ color: 'rgba(212,175,55,0.85)' }}>
            {lang === 'ar' ? 'إعادة إرسال' : 'Resend'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
