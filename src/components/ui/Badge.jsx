const colorStyles = {
  primary: { background: 'rgba(122,30,43,0.10)', color: '#7A1E2B' },
  accent:  { background: 'rgba(212,175,55,0.10)', color: '#B8962E' },
  success: { background: 'rgba(52,199,89,0.10)',  color: '#34C759' },
  error:   { background: 'rgba(255,59,48,0.10)',   color: '#FF3B30' },
  warning: { background: 'rgba(255,149,0,0.10)',   color: '#FF9500' },
  muted:   { background: 'rgba(28,28,30,0.05)',    color: '#8E8E93' },
  glass:   { background: 'rgba(255,255,255,0.85)', color: '#1C1C1E' },
};

const dotColors = {
  primary: '#7A1E2B',
  accent:  '#D4AF37',
  success: '#34C759',
  error:   '#FF3B30',
  warning: '#FF9500',
  muted:   '#8E8E93',
  glass:   '#1C1C1E',
};

export default function Badge({ children, color = 'primary', className = '', dot = false }) {
  const style = colorStyles[color] || colorStyles.primary;
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${className}`}
      style={style}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ background: dotColors[color] || dotColors.primary }}
        />
      )}
      {children}
    </span>
  );
}
