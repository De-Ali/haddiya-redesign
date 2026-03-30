import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

/* ── Flag SVGs (inline for zero dependencies) ── */
const OmanFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
    <rect width="20" height="14" fill="#FFFFFF" />
    <rect y="0" width="20" height="4.67" fill="#FFFFFF" />
    <rect y="4.67" width="20" height="4.67" fill="#DB161B" />
    <rect y="9.33" width="20" height="4.67" fill="#008000" />
    <rect x="0" y="0" width="6" height="14" fill="#DB161B" />
    {/* Khanjar emblem simplified */}
    <g transform="translate(3, 1.5) scale(0.022)">
      <path d="M60 0 L90 30 L60 60 L30 30 Z" fill="#FFFFFF" opacity="0.9"/>
    </g>
  </svg>
);

const USFlag = () => (
  <svg width="20" height="14" viewBox="0 0 20 14" style={{ borderRadius: 2, overflow: 'hidden', flexShrink: 0 }}>
    <rect width="20" height="14" fill="#B22234" />
    {[0,2,4,6,8,10,12].map(i => <rect key={i} y={i * (14/13)} width="20" height={14/13} fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'} />)}
    <rect width="8" height="7.5" fill="#3C3B6E" />
    {/* Stars simplified */}
    {[1,2.5,4,5.5,7].map((x,i) => [1.2,2.8,4.4,6].map((y,j) =>
      <circle key={`${i}-${j}`} cx={x} cy={y} r="0.4" fill="#FFFFFF" />
    ))}
  </svg>
);

const languages = [
  { code: 'ar', label: 'العربية', labelEn: 'Arabic', Flag: OmanFlag },
  { code: 'en', label: 'English', labelEn: 'English', Flag: USFlag },
];

export default function LanguageDropdown() {
  const { lang, toggleLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = languages.find(l => l.code === lang) || languages[1];
  const other = languages.find(l => l.code !== lang);

  /* Close on outside click */
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [open]);

  const handleSelect = (code) => {
    if (code !== lang) toggleLanguage();
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="h-[38px] px-2.5 rounded-[13px] flex items-center gap-2 active:scale-95 transition-all"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.45))',
          border: '0.5px solid rgba(255,255,255,0.6)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <current.Flag />
        <span className="text-[11px] font-semibold" style={{ color: '#1C1C1E' }}>
          {lang === 'ar' ? 'AR' : 'EN'}
        </span>
        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </motion.svg>
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.18, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="absolute top-[46px] end-0 z-[60] w-[180px]"
            style={{
              background: 'rgba(255,255,255,0.92)',
              backdropFilter: 'blur(24px) saturate(1.8)',
              WebkitBackdropFilter: 'blur(24px) saturate(1.8)',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.6)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.04)',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <div className="px-4 pt-3 pb-1.5">
              <span className="text-[9px] font-bold uppercase tracking-[0.1em]" style={{ color: '#AEAEB2' }}>
                {lang === 'ar' ? 'اختر اللغة' : 'Select Language'}
              </span>
            </div>

            {/* Options */}
            {languages.map((l) => {
              const isActive = l.code === lang;
              return (
                <button
                  key={l.code}
                  onClick={() => handleSelect(l.code)}
                  className="w-full px-4 py-3 flex items-center gap-3 transition-colors active:bg-black/[0.03]"
                  style={{ background: isActive ? 'rgba(122,30,43,0.04)' : 'transparent' }}
                >
                  <l.Flag />
                  <div className="flex-1 text-start">
                    <span className="text-[13px] font-semibold block leading-tight" style={{ color: '#1C1C1E' }}>
                      {l.label}
                    </span>
                    {l.code === 'ar' && (
                      <span className="text-[10px]" style={{ color: '#AEAEB2' }}>Arabic</span>
                    )}
                    {l.code === 'en' && (
                      <span className="text-[10px]" style={{ color: '#AEAEB2' }}>English</span>
                    )}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: '#7A1E2B' }}
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </motion.div>
                  )}
                </button>
              );
            })}

            {/* Footer */}
            <div className="px-4 py-2.5" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
              <span className="text-[9px]" style={{ color: '#C7C7CC' }}>
                {languages.length} {lang === 'ar' ? 'لغات متاحة' : 'languages available'}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
