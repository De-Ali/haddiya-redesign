import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key, Sms } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();

  return (
    <div
      className="flex-1 relative overflow-hidden flex flex-col items-center justify-center px-7"
      style={{ background: 'linear-gradient(155deg, #8A2232 0%, #6A1825 30%, #4A1018 60%, #2A0A10 100%)' }}
    >
      {/* Ambient orb */}
      <div className="absolute bottom-40 -start-20 w-52 h-52 rounded-full blur-[80px]" style={{ background: 'rgba(212,175,55,0.08)' }} />

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
          <Key size={36} variant="Bold" color="#D4AF37" />
        </div>

        <h1 className="font-display text-[28px] font-semibold text-white mb-2 tracking-tight">
          {t.auth.resetPassword}
        </h1>
        <p className="text-white/40 text-[13px] mb-8 max-w-[260px] mx-auto leading-relaxed">
          {lang === 'ar'
            ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين'
            : "Enter your email and we'll send you a reset link"
          }
        </p>

        {/* Email input */}
        <div
          className="flex items-center gap-3.5 px-5 py-4 mb-6 text-start"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(24px)',
            borderRadius: '16px',
            border: '1.5px solid rgba(255,255,255,0.12)',
          }}
        >
          <Sms size={17} variant="Outline" color="rgba(255,255,255,0.35)" />
          <input
            placeholder={t.auth.email}
            type="email"
            className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30 font-medium"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => navigate('/otp')}
          className="w-full py-4 rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform mb-5"
          style={{
            background: '#D4AF37',
            color: '#fff',
            boxShadow: '0 8px 24px rgba(212,175,55,0.25)',
          }}
        >
          {lang === 'ar' ? 'إرسال الرابط' : 'Send Reset Link'}
        </button>

        <button
          onClick={() => navigate('/login')}
          className="text-white/40 text-[12px]"
        >
          {t.auth.hasAccount}{' '}
          <span className="font-semibold" style={{ color: 'rgba(212,175,55,0.85)' }}>{t.auth.login}</span>
        </button>
      </motion.div>
    </div>
  );
}
