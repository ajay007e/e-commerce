import AvailabilityEditor from "./AvailabilityEditor";
import ProductPriceEditor from "./ProductPriceEditor";
import type { PricingValue } from "./ProductPriceEditor";

/* ---------------------------------------------
   Types
--------------------------------------------- */

export interface VariantItem {
  size: string;

  availability: {
    status: "AVAILABLE" | "OUT_OF_STOCK" | "PREORDER";
    reason?: string;
  };

  /** Optional override pricing */
  pricing?: PricingValue | null;
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

  /* Update Variant */

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
    updateVariant(index, { availability });
  };

  /* Update Pricing */

  const updatePricing = (index: number, pricing: PricingValue | null) => {
    updateVariant(index, { pricing });
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  if (!variants.length) {
    return <p className="text-sm text-gray-500">No variants available.</p>;
  }

  return (
    <div className="space-y-4">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Variants (Auto Generated from Sizes)
      </label>

      {/* Variants */}
      {variants.map((variant, i) => (
        <div
          key={i}
          className="
            rounded-md border border-gray-200
            p-4 space-y-5 bg-gray-50
          "
        >
          {/* Size Header */}
          <p className="text-base font-semibold text-gray-800">
            Size: {variant.size}
          </p>

          {/* Availability */}
          <AvailabilityEditor
            value={variant.availability}
            onChange={(val) => updateAvailability(i, val)}
          />

          {/* Pricing Override */}
          <ProductPriceEditor
            label="Variant Pricing"
            value={variant.pricing}
            optional
            onChange={(val) => updatePricing(i, val)}
          />
        </div>
      ))}

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
