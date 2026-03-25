import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', variant = 'default', onClick, animate = true }) {
  const variants = {
    default: 'glass rounded-2xl',
    strong: 'glass-strong rounded-2xl',
    dark: 'glass-dark rounded-2xl',
    accent: 'glass rounded-2xl',
    flat: 'bg-white/60 rounded-2xl border border-white/30',
  };

  const Comp = animate ? motion.div : 'div';
  const animProps = animate ? {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
    whileTap: onClick ? { scale: 0.98 } : undefined,
  } : {};

  return (
    <Comp
      className={`${variants[variant]} ${className}`}
      onClick={onClick}
      {...animProps}
    >
      {children}
    </Comp>
  );
}
