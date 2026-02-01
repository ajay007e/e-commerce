interface FilterActionsProps {
  isDirty: boolean;
  onApply: () => void;
  onClear: () => void;
}

export function FilterActions({
  isDirty,
  onApply,
  onClear,
}: FilterActionsProps) {
  return (
    <div className="space-y-2 pt-4 border-t">
      <button
        type="button"
        disabled={!isDirty}
        onClick={onApply}
        className="w-full rounded-md bg-gray-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Apply filters
      </button>

      <button
        type="button"
        onClick={onClear}
        className="w-full rounded-md border py-2 text-sm text-gray-700"
      >
        Clear all
      </button>
    </div>
  );
}
