import ShimmerBox from '../ui/ShimmerBox';

/* ─── ProductListingSkeleton ─────────────────────────────────────────────── */
export default function ProductListingSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 pb-24"
      style={{ background: '#F8F7F6', minHeight: '100vh', paddingTop: '16px' }}
    >
      {/* Filter chips */}
      <div className="flex gap-3 px-5 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <ShimmerBox
            key={i}
            height="34px"
            borderRadius="9999px"
            style={{ width: i === 0 ? '72px' : i === 1 ? '88px' : i === 2 ? '64px' : i === 3 ? '96px' : '80px', flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Product grid — 2 columns */}
      <div className="px-5 grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            {/* 4:3 image placeholder */}
            <ShimmerBox
              width="100%"
              borderRadius="12px"
              style={{ aspectRatio: '4 / 3' }}
            />
            <ShimmerBox width="90%" height="14px" borderRadius="4px" />
            <ShimmerBox width="65%" height="12px" borderRadius="4px" />
            <ShimmerBox width="50%" height="16px" borderRadius="4px" />
          </div>
        ))}
      </div>
    </div>
  );
}
