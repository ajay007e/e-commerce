import { useEffect, useState } from "react";
import CategoryDrawer from "./categories/CategoryDrawer";
import type { Category } from "./categories/CategoryDrawer";
import { getCategories } from "@/api/categories.api";

/* Build Tree */
function buildTree(categories: Category[]) {
  const map = new Map<string, Category & { children: Category[] }>();

  // Init map
  categories.forEach((cat) => {
    map.set(cat._id, { ...cat, children: [] });
  });

  const roots: (Category & { children: Category[] })[] = [];

  // Assign children
  categories.forEach((cat) => {
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children.push(map.get(cat._id)!);
    } else {
      roots.push(map.get(cat._id)!);
    }
  });
  return roots;
}

/* Recursive Tree Item */
function CategoryNode({
  node,
  level,
  onSelect,
}: {
  node: Category & { children: Category[] };
  level: number;
  onSelect: (cat: Category) => void;
}) {
  return (
    <div>
      {/* Row */}
      <button
        onClick={() => onSelect(node)}
        className="
          w-full text-left px-3 py-2
          hover:bg-gray-50
          flex justify-between items-center
          text-sm
        "
        style={{ paddingLeft: `${level * 16 + 12}px` }}
      >
        <span>{node.name}</span>

        <span className="text-xs text-gray-400">/{node.slug}</span>
      </button>

      {/* Children */}
      {node.children.map((child) => (
        <CategoryNode
          key={child._id}
          node={child}
          level={level + 1}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selected, setSelected] = useState<Category | null>(null);

  /* Load */
  const loadCategories = async () => {
    const data = await getCategories();
    setCategories(data);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const tree = buildTree(categories);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Categories</h1>

          <p className="text-sm text-gray-500">Manage product categories</p>
        </div>

        {/* Add */}
        <button
          onClick={() => {
            setSelected(null);
            setDrawerOpen(true);
          }}
          className="
            inline-flex items-center gap-2
            rounded-md bg-gray-900
            px-4 py-2 text-sm
            font-medium text-white
            hover:bg-gray-800
            focus:ring-2
            focus:ring-gray-900
          "
        >
          + Add Category
        </button>
      </div>

      {/* Tree */}
      <div className="bg-white border rounded divide-y">
        {tree.length === 0 && (
          <div className="p-4 text-sm text-gray-500">No categories yet</div>
        )}

        {tree.map((root) => (
          <CategoryNode
            key={root._id}
            node={root}
            level={0}
            onSelect={(cat) => {
              setSelected(cat);
              setDrawerOpen(true);
            }}
          />
        ))}
      </div>

      {/* Drawer */}
      <CategoryDrawer
        open={drawerOpen}
        category={selected}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadCategories}
      />
    </div>
  );
}
