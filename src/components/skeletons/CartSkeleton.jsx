import ShimmerBox from '../ui/ShimmerBox';

/* ─── CartSkeleton ───────────────────────────────────────────────────────── */
export default function CartSkeleton() {
  return (
    <div
      className="flex flex-col gap-4 pb-28"
      style={{ background: '#F8F7F6', minHeight: '100vh', paddingTop: '20px' }}
    >
      {/* Page title */}
      <div className="px-5">
        <ShimmerBox width="100px" height="24px" borderRadius="6px" />
      </div>

      {/* Cart item cards — 3 items */}
      <div className="flex flex-col gap-3 px-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-4 p-4"
            style={{
              background: '#FFFFFF',
              borderRadius: '16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
          >
            {/* Item image */}
            <ShimmerBox width="70px" height="70px" borderRadius="10px" style={{ flexShrink: 0 }} />

            {/* Item text lines */}
            <div className="flex flex-col gap-2 flex-1 pt-1">
              <ShimmerBox width="80%" height="14px" borderRadius="4px" />
              <ShimmerBox width="55%" height="12px" borderRadius="4px" />
              <ShimmerBox width="40%" height="16px" borderRadius="4px" />
            </div>

            {/* Quantity stepper placeholder */}
            <ShimmerBox width="80px" height="32px" borderRadius="9999px" style={{ flexShrink: 0, alignSelf: 'flex-end' }} />
          </div>
        ))}
      </div>

      {/* Order summary block */}
      <div
        className="mx-5 flex flex-col gap-3 p-5"
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        }}
      >
        <ShimmerBox width="130px" height="18px" borderRadius="6px" />
        <div className="flex flex-col gap-2 pt-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <ShimmerBox width="90px" height="13px" borderRadius="4px" />
              <ShimmerBox width="60px" height="13px" borderRadius="4px" />
            </div>
          ))}
        </div>
        <div style={{ height: '1px', background: '#EDE8E1', marginTop: '4px' }} />
        <div className="flex justify-between">
          <ShimmerBox width="60px" height="16px" borderRadius="4px" />
          <ShimmerBox width="80px" height="16px" borderRadius="4px" />
        </div>
      </div>

      {/* Checkout button */}
      <div className="px-5">
        <ShimmerBox width="100%" height="52px" borderRadius="12px" />
      </div>
    </div>
  );
}
