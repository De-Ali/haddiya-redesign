import { Star } from 'lucide-react';

export default function RatingStars({ rating, size = 12, showValue = true, count }) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map(i => (
          <Star
            key={i}
            size={size}
            style={{ color: i <= Math.round(rating) ? '#D4AF37' : 'rgba(28,28,30,0.15)' }}
            strokeWidth={0}
            fill="currentColor"
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-semibold" style={{ color: 'rgba(28,28,30,0.70)' }}>{rating}</span>
      )}
      {count !== undefined && (
        <span className="text-xs" style={{ color: '#8A7A70' }}>({count})</span>
      )}
    </div>
  );
}
