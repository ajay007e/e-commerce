interface MobileFilterButtonProps {
  appliedCount: number;
  onOpen: () => void;
}

export function MobileFilterButton({
  appliedCount,
  onOpen,
}: MobileFilterButtonProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-gray-800 lg:hidden"
    >
      Filters
      {appliedCount > 0 && (
        <span className="rounded-full bg-gray-900 px-2 py-0.5 text-xs text-white">
          {appliedCount}
        </span>
      )}
    </button>
  );
}
