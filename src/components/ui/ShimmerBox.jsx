import '../../styles/shimmer.css';

export default function ShimmerBox({ width, height, borderRadius, style, className = '' }) {
  return (
    <div
      className={`shimmer ${className}`}
      style={{ width, height, borderRadius, ...style }}
    />
  );
}
