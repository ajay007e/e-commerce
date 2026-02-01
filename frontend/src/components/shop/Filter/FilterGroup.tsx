import type { SearchFacetItem } from "@/config/business.types";

interface FilterGroupProps {
  title: string;
  items: SearchFacetItem[];
  selected: string[];
  collapsed?: boolean;
  onToggle: (id: string) => void;
}

export function FilterGroup({
  title,
  items,
  selected,
  collapsed = false,
  onToggle,
}: FilterGroupProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-gray-900">{title}</p>

      <ul className={`space-y-2 ${collapsed ? "hidden" : ""}`}>
        {items.map((item) => {
          const checked = selected.includes(item.id);

          return (
            <li key={item.id}>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => onToggle(item.id)}
                  className="rounded border-gray-300"
                />
                <span>{item.label}</span>
                {typeof item.count === "number" && (
                  <span className="text-xs text-gray-400">({item.count})</span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
