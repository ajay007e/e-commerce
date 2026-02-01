import type { SearchSortOption } from "@/config/config.types";
import { SORT_OPTIONS } from "@/config/constants";

interface SortDropdownProps {
  value: SearchSortOption;
  onChange: (value: SearchSortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort" className="text-sm text-gray-600">
        Sort by
      </label>

      <select
        id="sort"
        value={value}
        onChange={(e) => onChange(e.target.value as SearchSortOption)}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
