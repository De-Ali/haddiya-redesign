import ShimmerBox from '../ui/ShimmerBox';

/* ─── ProductDetailSkeleton ──────────────────────────────────────────────── */
export default function ProductDetailSkeleton() {
  return (
    <div
      className="flex flex-col pb-28"
      style={{ background: '#F8F7F6', minHeight: '100vh' }}
    >
      {/* Hero image — full width */}
      <ShimmerBox width="100%" height="340px" borderRadius="0px" />

      {/* Content area */}
      <div className="flex flex-col gap-4 px-5 pt-5">
        {/* Product name */}
        <div className="flex flex-col gap-2">
          <ShimmerBox width="75%" height="26px" borderRadius="6px" />
          <ShimmerBox width="50%" height="18px" borderRadius="6px" />
        </div>

        {/* Price */}
        <ShimmerBox width="100px" height="28px" borderRadius="6px" />

        {/* Divider spacing */}
        <div style={{ height: '1px', background: '#EDE8E1' }} />

        {/* Variant chips label */}
        <ShimmerBox width="80px" height="14px" borderRadius="4px" />

        {/* Variant chips row */}
        <div className="flex gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <ShimmerBox key={i} width="64px" height="36px" borderRadius="9999px" />
          ))}
        </div>

        {/* Description lines */}
        <div className="flex flex-col gap-2 pt-2">
          <ShimmerBox width="100%" height="13px" borderRadius="4px" />
          <ShimmerBox width="92%" height="13px" borderRadius="4px" />
          <ShimmerBox width="80%" height="13px" borderRadius="4px" />
        </div>
      </div>

      {/* CTA buttons — pinned at bottom */}
      <div className="flex gap-3 px-5 pt-6">
        <ShimmerBox width="100%" height="52px" borderRadius="12px" />
        <ShimmerBox width="52px" height="52px" borderRadius="12px" style={{ flexShrink: 0 }} />
      </div>
    </div>
  );
}
