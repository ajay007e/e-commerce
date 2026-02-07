import { useEffect, useState } from "react";

import { Select } from "@/components/ui/Input";
import { getCategories } from "@/api/categories.api";

/* ---------------------------------------------
   Types
--------------------------------------------- */

interface Category {
  _id: string;
  name: string;
  parentId?: string | null;
  children?: Category[];
}

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}

/* ---------------------------------------------
   Helpers
--------------------------------------------- */

/* Build Tree */
const buildTree = (list: Category[]) => {
  const map = new Map<string, Category>();

  list.forEach((cat) => {
    map.set(cat._id, { ...cat, children: [] });
  });

  const roots: Category[] = [];

  map.forEach((cat) => {
    if (cat.parentId && map.has(cat.parentId)) {
      map.get(cat.parentId)!.children!.push(cat);
    } else {
      roots.push(cat);
    }
  });

  return roots;
};

/* Flatten Tree for Dropdown */
const flattenTree = (nodes: Category[], level = 0): Option[] => {
  let result: Option[] = [];

  nodes.forEach((node) => {
    const isLeaf = !node.children || node.children.length === 0;

    result.push({
      label: `${"— ".repeat(level)}${node.name}`,
      value: node._id,
      disabled: !isLeaf, // Only leaf selectable
    });

    if (node.children?.length) {
      result = result.concat(flattenTree(node.children, level + 1));
    }
  });

  return result;
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

interface Props {
  value?: string;
  onChange?: (e: any) => void;
}

export default function CategoryTreeDropdown({ value, onChange }: Props) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  /* ---------------------------------------------
     Load Categories
  --------------------------------------------- */

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);

        const res = await getCategories();

        const tree = buildTree(res);

        const flat = flattenTree(tree);

        setOptions(flat);
      } catch (err) {
        console.error("Load categories failed:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <Select
      label="Category"
      value={value || ""}
      onChange={onChange}
      disabled={loading}
      options={[
        {
          label: loading ? "Loading categories..." : "Select category",
          value: "",
          disabled: true,
        },

        ...options,
      ]}
    />
  );
}
