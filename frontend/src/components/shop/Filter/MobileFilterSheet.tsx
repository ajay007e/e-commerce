import type { SearchFacets, SearchFilterState } from "@/config/business.types";

import { FilterGroup } from "./FilterGroup";
import { FilterActions } from "./FilterActions";

interface MobileFilterSheetProps {
  open: boolean;
  facets: SearchFacets;
  draftFilters: SearchFilterState;
  appliedFilters: SearchFilterState;
  onDraftChange: (filters: SearchFilterState) => void;
  onApply: () => void;
  onClear: () => void;
  onClose: () => void;
}

export function MobileFilterSheet({
  open,
  facets,
  draftFilters,
  appliedFilters,
  onDraftChange,
  onApply,
  onClear,
  onClose,
}: MobileFilterSheetProps) {
  if (!open) return null;

  const toggle = (key: "category" | "tags", id: string) => {
    const current = draftFilters[key];
    const next = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];

    onDraftChange({
      ...draftFilters,
      [key]: next,
    });
  };

  const isDirty =
    JSON.stringify(draftFilters) !== JSON.stringify(appliedFilters);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] rounded-t-xl bg-white p-4 overflow-y-auto">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-medium text-gray-900">Filters</p>
          <button onClick={onClose} className="text-sm text-gray-600">
            Close
          </button>
        </div>

        <div className="space-y-6">
          <FilterGroup
            title="Category"
            items={facets.categories}
            selected={draftFilters.category}
            onToggle={(id) => toggle("category", id)}
          />

          <FilterGroup
            title="Tags"
            items={facets.tags}
            selected={draftFilters.tags}
            collapsed
            onToggle={(id) => toggle("tags", id)}
          />

          <FilterActions
            isDirty={isDirty}
            onApply={() => {
              onApply();
              onClose();
            }}
            onClear={onClear}
          />
        </div>
      </div>
    </div>
  );
}
