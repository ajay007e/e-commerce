import { useEffect, useState } from "react";
import type { Category } from "./types";
import { getCategories } from "@/api/categories.api";

interface Props {
  value: string | null;
  onChange: (id: string | null) => void;
  error?: string;
  label?: string;
}

const selectBase = `
  h-10 w-full rounded-md border border-gray-300
  bg-white px-3 text-sm
  text-gray-900
  transition
  focus:outline-none
  focus:ring-2 focus:ring-blue-500
  focus:border-blue-500
`;

export default function CategoryTreeDropdown({
  value,
  onChange,
  error,
  label = "Category",
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const load = async () => {
      const data = await getCategories();
      setCategories(data);
    };

    load();
  }, []);

  return (
    <div className="space-y-1">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Select */}
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value || null)}
        className={selectBase}
      >
        <option value="">Select category</option>

        {categories
          .filter((c) => !c.children || c.children.length === 0)
          .map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
      </select>

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
