import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Sms, Lock1, Call, Gift, Eye, EyeSlash } from 'iconsax-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const { login } = useAuth();
  const [showPass, setShowPass] = useState(false);

  const handleSignup = () => { login(); navigate('/otp'); };

  const fields = [
    { Icon: User, placeholder: t.auth.name, type: 'text' },
    { Icon: Sms, placeholder: t.auth.email, type: 'email' },
    { Icon: Call, placeholder: t.auth.phone, type: 'tel' },
    { Icon: Lock1, placeholder: t.auth.password, type: 'password' },
  ];

  return (
    <div
      className="flex-1 relative overflow-hidden flex flex-col"
      style={{ background: 'linear-gradient(155deg, #8A2232 0%, #6A1825 30%, #4A1018 60%, #2A0A10 100%)' }}
    >
      {/* Ambient orbs */}
      <div className="absolute top-20 end-0 w-56 h-56 rounded-full blur-[100px]" style={{ background: 'rgba(212,175,55,0.08)' }} />
      <div className="absolute bottom-40 -start-20 w-44 h-44 rounded-full blur-[80px]" style={{ background: 'rgba(255,255,255,0.03)' }} />

      <div className="flex-1 flex flex-col justify-center px-7 pb-10 pt-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div
            className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center mb-5"
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(24px)',
              border: '1.5px solid rgba(255,255,255,0.12)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.20)',
            }}
          >
            <Gift size={32} variant="Bold" color="#D4AF37" />
          </div>
          <h1 className="font-display text-[32px] font-semibold text-white tracking-tight">
            {t.auth.signup}
          </h1>
          <p className="text-white/35 text-[13px] mt-2 font-light">
            {lang === 'ar' ? 'انضم إلى مجتمع هدية' : 'Join the Haddiya community'}
          </p>
        </motion.div>

        {/* Form fields */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-3 mb-7"
        >
          {fields.map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-3.5 px-5 py-4"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(24px)',
                borderRadius: '16px',
                border: '1.5px solid rgba(255,255,255,0.25)',
              }}
            >
              <f.Icon size={17} variant="Outline" color="rgba(255,255,255,0.35)" />
              <input
                type={f.type === 'password' ? (showPass ? 'text' : 'password') : f.type}
                placeholder={f.placeholder}
                className="flex-1 bg-transparent outline-none text-[14px] text-white placeholder:text-white/30 font-medium"
              />
              {f.type === 'password' && (
                <button onClick={() => setShowPass(!showPass)} className="p-1">
                  {showPass
                    ? <EyeSlash size={16} variant="Outline" color="rgba(255,255,255,0.30)" />
                    : <Eye size={16} variant="Outline" color="rgba(255,255,255,0.30)" />
                  }
                </button>
              )}
            </div>
          ))}
        </motion.div>

        {/* Submit */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <button
            onClick={handleSignup}
            className="w-full py-4 rounded-2xl text-[15px] font-bold active:scale-[0.98] transition-transform"
            style={{
              background: '#D4AF37',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(212,175,55,0.25)',
            }}
          >
            {t.auth.signup}
          </button>
        </motion.div>

        <p className="text-center text-white/35 text-[12px] mt-6">
          {t.auth.hasAccount}{' '}
          <button onClick={() => navigate('/login')} className="text-accent font-bold">
            {t.auth.login}
          </button>
        </p>
      </div>
    </div>
  );
}
