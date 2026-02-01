import type { SearchSortOption } from "@/config/business.types";
import { ResultSummary } from "./ResultSummary";
import { SortDropdown } from "./SortDropdown";
import { SearchInput } from "./SearchInput";

interface ShopHeaderProps {
  totalResults: number;
  sort: SearchSortOption;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onSortChange: (value: SearchSortOption) => void;
}

export function ShopHeader({
  totalResults,
  sort,
  searchValue,
  onSearchChange,
  onSearchSubmit,
  onSortChange,
}: ShopHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:grid sm:grid-cols-[auto_1fr_auto] sm:items-center">
      {/* Mobile: 2nd | Desktop: 1st */}
      <div className="order-2 sm:order-none">
        <ResultSummary total={totalResults} />
      </div>

      {/* Mobile: 1st | Desktop: 2nd */}
      <div className="order-1 sm:order-none w-full">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </div>

      {/* Mobile: 3rd | Desktop: 3rd */}
      <div className="order-3 sm:order-none sm:justify-self-end">
        <SortDropdown value={sort} onChange={onSortChange} />
      </div>
    </div>
  );
}
