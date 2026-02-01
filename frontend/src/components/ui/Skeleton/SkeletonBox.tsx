interface SkeletonBoxProps {
  className?: string;
}

export function SkeletonBox({ className = "" }: SkeletonBoxProps) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 ${className}`}
      aria-hidden="true"
    />
  );
}
