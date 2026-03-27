import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeSlash } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const isAr = lang === 'ar';

  const handleLogin = () => { login(); navigate('/home'); };

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
          {isAr ? 'مرحباً بعودتك' : 'Welcome Back'}
        </h2>
        <p className="text-[13px] mb-7" style={{ color: '#8A7A70' }}>
          {isAr ? 'سجل دخولك لمتابعة الإهداء' : 'Sign in to continue gifting'}
        </p>

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

        {/* Password */}
        <label className="block text-[12px] font-semibold mb-1.5" style={{ color: '#1A1A1A' }}>
          {isAr ? 'كلمة المرور' : 'Password'}
        </label>
        <div className="flex items-center rounded-xl px-4 py-3.5 mb-2" style={{ background: '#F5F0EB', border: '1px solid #EDE8E1' }}>
          <input
            type={showPass ? 'text' : 'password'}
            placeholder={isAr ? 'أدخل كلمة المرور' : 'Enter your password'}
            className="flex-1 bg-transparent outline-none text-[14px] font-medium"
            style={{ color: '#1A1A1A' }}
          />
          <button onClick={() => setShowPass(!showPass)} className="p-1 ms-2">
            {showPass
              ? <EyeSlash size={18} variant="Outline" color="#8A7A70" />
              : <Eye size={18} variant="Outline" color="#8A7A70" />
            }
          </button>
        </div>

        {/* Forgot password */}
        <div className="flex justify-end mb-6">
          <button onClick={() => navigate('/forgot-password')} className="text-[12px] font-semibold" style={{ color: '#7A1E2B' }}>
            {isAr ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
          </button>
        </div>

        {/* Login button */}
        <button
          onClick={handleLogin}
          className="w-full py-4 rounded-full text-[15px] font-bold mb-6 active:scale-[0.98] transition-transform"
          style={{ background: '#D4AF37', color: '#1A1A1A', boxShadow: '0 4px 16px rgba(212,175,55,0.3)' }}
        >
          {isAr ? 'تسجيل الدخول' : 'Login'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px" style={{ background: '#EDE8E1' }} />
          <span className="text-[11px] font-medium" style={{ color: '#8A7A70' }}>
            {isAr ? 'أو المتابعة عبر' : 'or continue with'}
          </span>
          <div className="flex-1 h-px" style={{ background: '#EDE8E1' }} />
        </div>

        {/* Social buttons */}
        <div className="flex gap-3 mb-8">
          {/* Google */}
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[13px] font-semibold active:scale-[0.98] transition-transform"
            style={{ background: '#FFFFFF', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google
          </button>
          {/* Apple */}
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-full text-[13px] font-semibold active:scale-[0.98] transition-transform"
            style={{ background: '#FFFFFF', color: '#1A1A1A', border: '1px solid #EDE8E1' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1A1A">
              <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            Apple
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-[13px]" style={{ color: '#8A7A70' }}>
          {isAr ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
          <button onClick={() => navigate('/signup')} className="font-bold" style={{ color: '#7A1E2B' }}>
            {isAr ? 'إنشاء حساب' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
