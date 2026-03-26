import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeSlash } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const isAr = lang === 'ar';

  const handleSignup = () => { login(); navigate('/otp'); };

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

      {/* ── White form card ── */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="flex-1 px-6 pt-8 pb-10"
        style={{ background: '#FFFFFF', borderRadius: '28px 28px 0 0', boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}
      >
        <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', fontWeight: 700, color: '#7A1E2B', marginBottom: '4px' }}>
          {isAr ? 'إنشاء حساب' : 'Create Account'}
        </h2>
        <p className="text-[13px] mb-6" style={{ color: '#8A7A70' }}>
          {isAr ? 'ابدأ رحلة الإهداء اليوم' : 'Start your gifting journey today'}
        </p>

        {/* Full Name */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'الاسم الكامل' : 'Full Name'}
        </label>
        <input
          type="text"
          placeholder={isAr ? 'أدخل اسمك الكامل' : 'Enter your full name'}
          className="w-full rounded-xl px-4 py-3.5 text-[14px] font-medium outline-none mb-4"
          style={{ background: '#F5F0EB', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
        />

        {/* Email */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'البريد الإلكتروني' : 'Email Address'}
        </label>
        <input
          type="email"
          placeholder={isAr ? 'بريدك@email.com' : 'your@email.com'}
          className="w-full rounded-xl px-4 py-3.5 text-[14px] font-medium outline-none mb-4"
          style={{ background: '#F5F0EB', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
        />

        {/* Phone */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'رقم الهاتف' : 'Phone Number'}
        </label>
        <input
          type="tel"
          placeholder="+968 XXXX XXXX"
          className="w-full rounded-xl px-4 py-3.5 text-[14px] font-medium outline-none mb-4"
          style={{ background: '#F5F0EB', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
        />

        {/* Password */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'كلمة المرور' : 'Password'}
        </label>
        <div className="flex items-center rounded-xl px-4 py-3.5 mb-4" style={{ background: '#F5F0EB', border: '1px solid #EDE8E1' }}>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder={isAr ? 'أنشئ كلمة مرور' : 'Create a password'}
            className="flex-1 bg-transparent outline-none text-[14px] font-medium"
            style={{ color: '#1A1A1A' }}
          />
          <button onClick={() => setShowPass(!showPass)} className="p-1 ms-2">
            {showPass ? <EyeSlash size={18} variant="Outline" color="#8A7A70" /> : <Eye size={18} variant="Outline" color="#8A7A70" />}
          </button>
        </div>

        {/* Confirm Password */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'تأكيد كلمة المرور' : 'Confirm Password'}
        </label>
        <div className="flex items-center rounded-xl px-4 py-3.5 mb-5" style={{ background: '#F5F0EB', border: '1px solid #EDE8E1' }}>
          <input
            type={showConfirm ? 'text' : 'password'}
            placeholder={isAr ? 'أعد إدخال كلمة المرور' : 'Re-enter your password'}
            className="flex-1 bg-transparent outline-none text-[14px] font-medium"
            style={{ color: '#1A1A1A' }}
          />
          <button onClick={() => setShowConfirm(!showConfirm)} className="p-1 ms-2">
            {showConfirm ? <EyeSlash size={18} variant="Outline" color="#8A7A70" /> : <Eye size={18} variant="Outline" color="#8A7A70" />}
          </button>
        </div>

        {/* Terms checkbox */}
        <label className="flex items-start gap-3 mb-6 cursor-pointer">
          <button
            onClick={() => setAgreed(!agreed)}
            className="w-[22px] h-[22px] rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors"
            style={{
              background: agreed ? '#7A1E2B' : 'transparent',
              border: agreed ? 'none' : '2px solid #C4B5A5',
            }}
          >
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            )}
          </button>
          <span className="text-[12px] leading-relaxed" style={{ color: '#8A7A70' }}>
            {isAr ? 'أوافق على ' : 'I agree to the '}
            <span style={{ color: '#7A1E2B', fontWeight: 600 }}>{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</span>
            {isAr ? ' و' : ' and '}
            <span style={{ color: '#7A1E2B', fontWeight: 600 }}>{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</span>
          </span>
        </label>

        {/* Create Account button */}
        <button
          onClick={handleSignup}
          disabled={!agreed}
          className="w-full py-4 rounded-full text-[15px] font-bold mb-6 active:scale-[0.98] transition-all"
          style={{
            background: agreed ? '#D4AF37' : '#EDE8E1',
            color: agreed ? '#1A1A1A' : '#8A7A70',
            boxShadow: agreed ? '0 4px 16px rgba(212,175,55,0.3)' : 'none',
            opacity: agreed ? 1 : 0.7,
          }}
        >
          {isAr ? 'إنشاء حساب' : 'Create Account'}
        </button>

        {/* Login link */}
        <p className="text-center text-[13px]" style={{ color: '#8A7A70' }}>
          {isAr ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
          <button onClick={() => navigate('/login')} className="font-bold" style={{ color: '#1A1A1A' }}>
            {isAr ? 'تسجيل الدخول' : 'Login'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
