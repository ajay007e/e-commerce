interface EmptyStateProps {
  onClearFilters?: () => void;
}

export function EmptyState({ onClearFilters }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <p className="text-sm text-gray-700">No products match your filters.</p>

      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="mt-4 text-sm font-medium text-gray-900 underline"
        >
          Clear filters
        </button>
      )}
    </div>
  );
}
