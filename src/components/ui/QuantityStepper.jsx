import { Minus, Plus } from 'lucide-react';

export default function QuantityStepper({ value, onChange, min = 1, max = 99 }) {
  return (
    <div className="glass rounded-2xl flex items-center gap-0 overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center hover:bg-white/60 active:bg-white/80 transition-colors"
        disabled={value <= min}
      >
        <Minus size={14} style={{ color: value <= min ? 'rgba(138,122,112,0.40)' : '#7A1E2B' }} />
      </button>
      <span className="w-8 text-center text-sm font-semibold" style={{ color: '#1C1C1E' }}>{value}</span>
      <button
        onClick={() => onChange(Math.min(max, value + 1))}
        className="w-9 h-9 flex items-center justify-center hover:bg-white/60 active:bg-white/80 transition-colors"
        disabled={value >= max}
      >
        <Plus size={14} style={{ color: value >= max ? 'rgba(138,122,112,0.40)' : '#7A1E2B' }} />
      </button>
    </div>
  );
}
