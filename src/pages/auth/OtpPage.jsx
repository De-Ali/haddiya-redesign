import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';

export default function OtpPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useLanguage();
  const { login } = useAuth();
  const isAr = lang === 'ar';

  const phone = location.state?.phone || '+96896071771';
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

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

  const handleResend = () => {
    setCountdown(60);
    setCanResend(false);
    setOtp(['', '', '', '']);
  };

  const isFilled = otp.every(d => d);

  const handleConfirm = () => {
    if (isFilled) {
      login();
      navigate('/home');
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col" style={{ background: '#FFFFFF' }}>
      {/* ── Top curved section ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            background: '#F5F0EB',
            height: 100,
            borderRadius: '0 0 50% 50% / 0 0 40px 40px',
          }}
        />
      </motion.div>

      {/* ── Content ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="flex-1 flex flex-col px-6 pt-10"
      >
        {/* Message text */}
        <p style={{ fontSize: 15, color: '#1A1A1A', lineHeight: 1.6, marginBottom: 24 }}>
          {isAr ? 'تم إرسال رسالة نصية إلى الرقم' : 'A text message has been sent with the'}{' '}
          <span style={{ fontWeight: 700, color: '#1A1A1A' }}>{phone}</span>
        </p>

        {/* OTP inputs */}
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginBottom: 32 }}>
          {otp.map((digit, i) => (
            <motion.input
              key={i}
              ref={refs[i]}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08 }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                textAlign: 'center',
                fontSize: 22,
                fontWeight: 700,
                color: '#1A1A1A',
                outline: 'none',
                background: digit ? '#FFFFFF' : '#F0EDED',
                border: digit ? '2px solid #7A1E2B' : '1px solid #E8E3E3',
                transition: 'all 0.2s',
              }}
            />
          ))}
        </div>

        {/* Resend / Timer */}
        <div className="text-center">
          <p style={{ fontSize: 14, color: '#8A7A70', marginBottom: 4 }}>
            {isAr ? 'لم تستلم رمز التحقق' : 'Did not receive the verification code'}
          </p>
          {canResend ? (
            <button
              onClick={handleResend}
              style={{ fontSize: 14, fontWeight: 600, color: '#7A1E2B', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              {isAr ? 'إعادة إرسال' : 'Resend'}
            </button>
          ) : (
            <p style={{ fontSize: 14, fontWeight: 500, color: '#AEAEB2' }}>
              {formatTime(countdown)}
            </p>
          )}
        </div>
      </motion.div>

      {/* ── Bottom button ── */}
      <div
        style={{
          padding: '16px 24px 40px',
          background: '#FFFFFF',
          borderRadius: '24px 24px 0 0',
          boxShadow: '0 -2px 12px rgba(0,0,0,0.04)',
        }}
      >
        <button
          onClick={handleConfirm}
          disabled={!isFilled}
          className="active:scale-[0.98] transition-all"
          style={{
            width: '100%',
            height: 56,
            borderRadius: 16,
            background: isFilled ? '#7A1E2B' : '#EDE8E1',
            color: isFilled ? '#FFFFFF' : '#AEAEB2',
            fontSize: 16,
            fontWeight: 600,
            border: 'none',
            cursor: isFilled ? 'pointer' : 'default',
            boxShadow: isFilled ? '0 4px 16px rgba(122,30,43,0.25)' : 'none',
          }}
        >
          {isAr ? 'تأكيد وتسجيل الدخول' : 'Confirm and login'}
        </button>
      </div>
    </div>
  );
}
