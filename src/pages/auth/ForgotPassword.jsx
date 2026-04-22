import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Key } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const isAr = lang === 'ar';

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
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, color: '#7A1E2B', marginTop: '8px' }}>
          Haddiya
        </h1>
      </motion.div>

      {/* ── White card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex-1 px-6 pt-8 pb-10"
        style={{ background: '#FFFFFF', borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}
      >
        {/* Key icon */}
        <div className="flex justify-center mb-6">
          <div
            className="w-[72px] h-[72px] rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(122,30,43,0.06)' }}
          >
            <Key size={36} variant="Bold" color="#7A1E2B" />
          </div>
        </div>

        <h2 className="text-center" style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 700, color: '#7A1E2B', marginBottom: '6px' }}>
          {isAr ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
        </h2>
        <p className="text-center text-[13px] mb-8 max-w-[260px] mx-auto leading-relaxed" style={{ color: '#8A7A70' }}>
          {isAr ? 'أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة التعيين' : "Enter your email and we'll send you a reset link"}
        </p>

        {/* Email input */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'البريد الإلكتروني' : 'Email Address'}
        </label>
        <input
          type="email"
          placeholder={isAr ? 'بريدك@email.com' : 'your@email.com'}
          className="w-full rounded-xl px-4 py-3.5 text-[14px] font-medium outline-none mb-6"
          style={{ background: '#F5F0EB', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
        />

        {/* Submit button */}
        <button
          onClick={() => navigate('/otp')}
          className="w-full py-4 rounded-full text-[15px] font-bold active:scale-[0.98] transition-transform mb-6"
          style={{ background: '#D4AF37', color: '#1A1A1A', boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
        >
          {isAr ? 'إرسال الرابط' : 'Send Reset Link'}
        </button>

        {/* Back to login */}
        <p className="text-center text-[13px]" style={{ color: '#8A7A70' }}>
          {isAr ? 'تذكرت كلمة المرور؟ ' : 'Remember your password? '}
          <button onClick={() => navigate('/login')} className="font-bold" style={{ color: '#7A1E2B' }}>
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
