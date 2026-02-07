import { useEffect, useState } from "react";
import Drawer from "@/components/ui/Drawer/Drawer";
import {
  createCategory,
  updateCategory,
  getCategories,
} from "@/api/categories.api";

/* Types */
export interface Category {
  _id: string;
  name: string;
  slug: string;
  parentId: number | null;
}

interface Props {
  open: boolean;
  category: Category | null; // null = create, object = edit
  onClose: () => void;
  onSaved: () => void;
}

export default function CategoryDrawer({
  open,
  category,
  onClose,
  onSaved,
}: Props) {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  /* Load parents */
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  /* Init form */
  useEffect(() => {
    if (!open) return;

    loadCategories();

    if (category) {
      // Edit
      setName(category.name);
      setParentId(category.parentId?.toString() ?? "");
    } else {
      // Create
      setName("");
      setParentId("");
    }
  }, [open, category]);

  /* Submit */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      const payload = {
        name,
        slug: generateSlug(name),
        parentId: parentId ? parentId : null,
      };
      console.log(payload);

      if (category) {
        await updateCategory(category._id, payload);
      } else {
        await createCategory(payload);
      }

      onSaved();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={category ? "Edit Category" : "Add Category"}
      width={420}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Category Name
          </label>

          <input
            value={name}
            onChange={(e) => {
              const val = e.target.value;

              setName(val);
            }}
            type="text"
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
            placeholder="Enter category name"
          />
        </div>

        {/* Parent */}
        <div>
          <label className="text-sm font-medium text-gray-700">
            Parent Category
          </label>

          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2 text-sm"
          >
            <option value="">Root Level</option>

            {categories
              .filter((c) => c._id !== category?._id)
              .map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>

        {/* Actions */}
        <div className="pt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm rounded
            bg-gray-900 text-white hover:bg-gray-800"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Drawer>
  );
}
