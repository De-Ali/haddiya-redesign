import ShimmerBox from '../ui/ShimmerBox';

/* ─── HomeScreenSkeleton ─────────────────────────────────────────────────── */
export default function HomeScreenSkeleton() {
  return (
    <div
      className="flex flex-col gap-6 pb-24"
      style={{ background: '#F8F7F6', minHeight: '100vh', paddingTop: '20px' }}
    >
      {/* Greeting area */}
      <div className="px-5 flex flex-col gap-2">
        <ShimmerBox width="200px" height="28px" borderRadius="8px" />
        <ShimmerBox width="150px" height="18px" borderRadius="6px" />
      </div>

      {/* Search bar */}
      <div className="px-5">
        <ShimmerBox width="100%" height="48px" borderRadius="9999px" />
      </div>

      {/* Hero banner */}
      <div className="px-5">
        <ShimmerBox width="100%" height="200px" borderRadius="16px" />
      </div>

      {/* Categories row */}
      <div className="flex flex-col gap-3">
        <div className="px-5">
          <ShimmerBox width="120px" height="20px" borderRadius="6px" />
        </div>
        <div className="flex gap-4 px-5 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 shrink-0">
              <ShimmerBox width="56px" height="56px" borderRadius="9999px" />
              <ShimmerBox width="48px" height="12px" borderRadius="4px" />
            </div>
          ))}
        </div>
      </div>

      {/* Product row */}
      <div className="flex flex-col gap-3">
        {/* Row header */}
        <div className="px-5 flex items-center justify-between">
          <ShimmerBox width="140px" height="20px" borderRadius="6px" />
          <ShimmerBox width="60px" height="16px" borderRadius="4px" />
        </div>

        {/* Product cards */}
        <div className="flex gap-4 px-5 overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="shrink-0 flex flex-col gap-2" style={{ width: '140px' }}>
              <ShimmerBox width="140px" height="140px" borderRadius="12px" />
              <ShimmerBox width="120px" height="14px" borderRadius="4px" />
              <ShimmerBox width="90px" height="12px" borderRadius="4px" />
              <ShimmerBox width="70px" height="16px" borderRadius="4px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
