import CategoryTreeDropdown from "./CategoryTreeDropdown";
import { Input } from "@/components/ui/Input";

/* ---------------------------------------------
   Types
--------------------------------------------- */

interface Props {
  search: string;
  categoryId: string | null;

  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string | null) => void;

  onReset?: () => void;
}

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductTableHeader({
  search,
  categoryId,

  onSearchChange,
  onCategoryChange,

  onReset,
}: Props) {
  return (
    <div
      className="
        mb-4
        flex flex-col gap-3
        md:flex-row md:items-end md:justify-between
      "
    >
      {/* Left: Search + Filter */}
      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        {/* Search */}
        <div className="w-full md:w-64">
          <Input
            label="Search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Category */}
        <div className="w-full md:w-64">
          <CategoryTreeDropdown
            value={categoryId || ""}
            onChange={(e) => onCategoryChange(e.target.value || null)}
          />
        </div>
      </div>

      {/* Right: Reset (Optional) */}
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="
            text-sm
            text-gray-600
            hover:text-gray-900
            underline
            self-start md:self-end
          "
        >
          Reset Filters
        </button>
      )}
    </div>
  );
}
