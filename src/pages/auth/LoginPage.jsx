import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sms, Lock1, Gift, Eye, EyeSlash } from 'iconsax-react';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const handleLogin = () => { login(); navigate('/home'); };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col" style={{ background: 'linear-gradient(155deg, #8A2232 0%, #6A1825 30%, #4A1018 60%, #2A0A10 100%)' }}>
      {/* Luxury ambient orbs */}
      <div className="absolute top-24 -start-20 w-56 h-56 rounded-full blur-[80px]" style={{ background: 'rgba(212,175,55,0.12)' }} />
      <div className="absolute bottom-40 -end-16 w-44 h-44 rounded-full blur-[60px]" style={{ background: 'rgba(255,255,255,0.04)' }} />
      <div className="absolute top-1/2 start-1/2 w-80 h-80 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" style={{ background: 'rgba(122,30,43,0.3)' }} />

      <div className="flex-1 flex flex-col justify-center px-7 pb-10 pt-6 relative z-10">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-10">
          <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-5 shadow-lg border border-white/10"
            style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(20px)' }}
          >
            <Gift size={32} variant="Bold" color="#D4AF37" />
          </div>
          <h1 className="font-display text-[32px] font-semibold text-white tracking-tight">{t.auth.login}</h1>
          <p className="text-white/35 text-[13px] mt-2 font-light">{lang === 'ar' ? 'مرحباً بك في هدية' : 'Welcome back to Haddiya'}</p>
        </motion.div>

        {/* Social login */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }} className="flex gap-3 mb-7">
          {[
            { label: 'G', icon: null },
            { label: 'f', icon: null },
            { label: '', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg> },
          ].map((item, i) => (
            <button key={i} className="flex-1 py-4 text-white/70 text-[13px] font-semibold active:scale-95 transition-all flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(24px)', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.22)' }}
            >
              {item.icon || item.label}
            </button>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-7">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />
          <span className="text-white/25 text-[11px] font-medium tracking-wider uppercase">{t.auth.social}</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.2), transparent)' }} />
        </div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }} className="space-y-3.5 mb-5">
          <div className="flex items-center gap-3.5 px-5 py-4"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(24px)', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.22)' }}
          >
            <Sms size={17} variant="Outline" color="rgba(255,255,255,0.40)" />
            <input placeholder={t.auth.email} className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/40 font-medium" />
          </div>
          <div className="flex items-center gap-3.5 px-5 py-4"
            style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(24px)', borderRadius: '16px', border: '1.5px solid rgba(255,255,255,0.22)' }}
          >
            <Lock1 size={17} variant="Outline" color="rgba(255,255,255,0.40)" />
            <input type={showPass ? 'text' : 'password'} placeholder={t.auth.password} className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/40 font-medium" />
            <button onClick={() => setShowPass(!showPass)} className="p-1">
              {showPass ? <EyeSlash size={16} variant="Outline" color="rgba(255,255,255,0.35)" /> : <Eye size={16} variant="Outline" color="rgba(255,255,255,0.35)" />}
            </button>
          </div>
        </motion.div>

        <button className="text-[12px] font-semibold text-end mb-7 transition-colors" style={{ color: 'rgba(212,175,55,0.85)' }} onClick={() => navigate('/forgot-password')}>
          {t.auth.forgot}
        </button>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Button variant="accent" size="full" onClick={handleLogin} className="shadow-gold">
            {t.auth.login}
          </Button>
        </motion.div>

        <p className="text-center text-white/35 text-[12px] mt-6">
          {t.auth.noAccount}{' '}
          <button onClick={() => navigate('/signup')} className="text-accent font-bold">{t.auth.signup}</button>
        </p>
      </div>
    </div>
  );
}
