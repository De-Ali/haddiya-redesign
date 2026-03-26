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
  const isAr = lang === 'ar';

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
    <div className="flex-1 flex flex-col overflow-y-auto" style={{ background: '#F5F0EB' }}>
      {/* ── Top logo section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center pt-12 pb-6"
      >
        <img src={`${import.meta.env.BASE_URL}haddiya-logo.png`} alt="Haddiya" className="w-[80px] h-[80px] object-contain" />
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', fontWeight: 600, color: '#7A1E2B', marginTop: '8px' }}>
          Haddiya
        </h1>
      </motion.div>

      {/* ── White card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex-1 px-6 pt-8 pb-10 text-center"
        style={{ background: '#FFFFFF', borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}
      >
        {/* Shield icon */}
        <div
          className="w-[72px] h-[72px] rounded-2xl mx-auto flex items-center justify-center mb-6"
          style={{ background: 'rgba(122,30,43,0.06)' }}
        >
          <ShieldTick size={36} variant="Bold" color="#7A1E2B" />
        </div>

        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 700, color: '#7A1E2B', marginBottom: '6px' }}>
          {isAr ? 'أدخل رمز التحقق' : 'Enter Verification Code'}
        </h2>
        <p className="text-[13px] mb-8 max-w-[260px] mx-auto leading-relaxed" style={{ color: '#8A7A70' }}>
          {isAr ? 'أرسلنا رمزاً إلى هاتفك' : 'We sent a code to your phone'}
        </p>

        {/* OTP inputs */}
        <div className="flex gap-3.5 justify-center mb-8">
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
              className="w-[60px] h-[60px] rounded-2xl text-center text-[22px] font-bold outline-none transition-all"
              style={{
                background: digit ? 'rgba(122,30,43,0.04)' : '#F5F0EB',
                border: digit ? '2px solid #7A1E2B' : '1.5px solid #EDE8E1',
                color: '#1A1A1A',
                boxShadow: digit ? '0 0 0 4px rgba(122,30,43,0.06)' : 'none',
              }}
            />
          ))}
        </div>

        {/* Verify button */}
        <button
          onClick={() => navigate('/home')}
          className="w-full py-4 rounded-full text-[15px] font-bold active:scale-[0.98] transition-all mb-6"
          style={{
            background: isFilled ? '#D4AF37' : '#EDE8E1',
            color: isFilled ? '#1A1A1A' : '#8A7A70',
            boxShadow: isFilled ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
            opacity: isFilled ? 1 : 0.7,
          }}
        >
          {isAr ? 'تحقق' : 'Verify'}
        </button>

        {/* Resend */}
        <p className="text-[13px]" style={{ color: '#8A7A70' }}>
          {isAr ? 'لم تستلم الرمز؟ ' : "Didn't receive the code? "}
          <button className="font-bold" style={{ color: '#7A1E2B' }}>
            {isAr ? 'إعادة إرسال' : 'Resend'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
