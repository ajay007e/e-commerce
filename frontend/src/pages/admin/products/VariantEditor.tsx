import { FaPlus, FaTimes } from "react-icons/fa";

import { Input } from "@/components/ui/Input";
import AvailabilityEditor from "./AvailabilityEditor";

/* ---------------------------------------------
   Types
--------------------------------------------- */

export interface VariantItem {
  sku: string;
  color: string;
  size: string;

  availability: {
    status: "AVAILABLE" | "OUT_OF_STOCK" | "PREORDER";
    reason?: string;
  };
}

interface Props {
  value?: VariantItem[];
  onChange: (val: VariantItem[]) => void;
  error?: string;
}

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function VariantEditor({ value, onChange, error }: Props) {
  /* Normalize */
  const variants: VariantItem[] = Array.isArray(value) ? value : [];

  /* Add */
  const addVariant = () => {
    onChange([
      ...variants,
      {
        sku: "",
        color: "",
        size: "",
        availability: {
          status: "AVAILABLE",
          reason: "",
        },
      },
    ]);
  };

  /* Update */
  const updateVariant = (index: number, patch: Partial<VariantItem>) => {
    const updated = [...variants];

    updated[index] = {
      ...updated[index],
      ...patch,
    };

    onChange(updated);
  };

  /* Update Availability */
  const updateAvailability = (
    index: number,
    availability: VariantItem["availability"],
  ) => {
    const updated = [...variants];

    updated[index] = {
      ...updated[index],
      availability,
    };

    onChange(updated);
  };

  /* Remove */
  const removeVariant = (index: number) => {
    onChange(variants.filter((_, i) => i !== index));
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Variants
      </label>

      {/* Variants */}
      <div className="space-y-4">
        {variants.map((variant, i) => (
          <div
            key={i}
            className="
              rounded-md border border-gray-200
              p-4 space-y-3 bg-gray-50
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Variant {i + 1}</p>

              <button
                type="button"
                onClick={() => removeVariant(i)}
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-md border border-gray-300
                  text-gray-400
                  hover:bg-red-50 hover:text-red-600
                "
              >
                <FaTimes size={12} />
              </button>
            </div>

            {/* Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* SKU */}
              <Input
                label="SKU"
                value={variant.sku}
                onChange={(e) =>
                  updateVariant(i, {
                    sku: e.target.value,
                  })
                }
                placeholder="HD-BLK-M"
              />

              {/* Color */}
              <Input
                label="Color"
                value={variant.color}
                onChange={(e) =>
                  updateVariant(i, {
                    color: e.target.value,
                  })
                }
                placeholder="Black"
              />

              {/* Size */}
              <Input
                label="Size"
                value={variant.size}
                onChange={(e) =>
                  updateVariant(i, {
                    size: e.target.value,
                  })
                }
                placeholder="M"
              />
            </div>

            {/* Availability */}
            <AvailabilityEditor
              value={variant.availability}
              onChange={(val) => updateAvailability(i, val)}
            />
          </div>
        ))}
      </div>

      {/* Add */}
      <button
        type="button"
        onClick={addVariant}
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-blue-600
          hover:text-blue-700
        "
      >
        <FaPlus size={12} />
        Add Variant
      </button>

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
