import { motion } from 'framer-motion';

const variants = {
  primary: { background: '#7A1E2B', color: '#fff', boxShadow: '0 4px 14px rgba(122,30,43,0.25)' },
  secondary: { background: '#FFFFFF', color: '#1C1C1E', boxShadow: '0 1px 4px rgba(0,0,0,0.06)', border: '1px solid rgba(0,0,0,0.06)' },
  accent: { background: '#D4AF37', color: '#fff', boxShadow: '0 4px 14px rgba(212,175,55,0.25)' },
  dark: { background: '#1C1C1E', color: '#fff', boxShadow: '0 4px 14px rgba(0,0,0,0.20)' },
  outline: { background: 'transparent', color: '#7A1E2B', border: '1.5px solid #7A1E2B' },
  ghost: { background: 'transparent', color: '#7A1E2B' },
};

const sizes = {
  sm: { padding: '8px 16px', fontSize: '12px', borderRadius: '10px', height: '36px' },
  md: { padding: '10px 20px', fontSize: '13px', borderRadius: '12px', height: '42px' },
  lg: { padding: '12px 24px', fontSize: '14px', borderRadius: '14px', height: '48px' },
  full: { padding: '0 24px', fontSize: '14px', borderRadius: '16px', height: '50px', width: '100%' },
};

export default function Button({ children, variant = 'primary', size = 'md', className = '', icon, iconRight, ...props }) {
  const v = variants[variant] || variants.primary;
  const s = sizes[size] || sizes.md;

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={`font-semibold inline-flex items-center justify-center gap-2 transition-all duration-200 active:opacity-90 ${className}`}
      style={{ ...v, ...s }}
      {...props}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
      {iconRight && <span className="flex-shrink-0">{iconRight}</span>}
    </motion.button>
  );
}
