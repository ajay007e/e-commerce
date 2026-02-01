import type { SearchFacets, SearchFilterState } from "@/config/business.types";

import { FilterGroup } from "./FilterGroup";
import { FilterActions } from "./FilterActions";

interface FilterSidebarProps {
  facets: SearchFacets;
  draftFilters: SearchFilterState;
  appliedFilters: SearchFilterState;
  onDraftChange: (next: SearchFilterState) => void;
  onApply: () => void;
  onClear: () => void;
}

export function FilterSidebar({
  facets,
  draftFilters,
  appliedFilters,
  onDraftChange,
  onApply,
  onClear,
}: FilterSidebarProps) {
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

      <FilterActions isDirty={isDirty} onApply={onApply} onClear={onClear} />
    </div>
  );
}
