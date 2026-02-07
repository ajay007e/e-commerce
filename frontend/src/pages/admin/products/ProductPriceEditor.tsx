import { Input } from "@/components/ui/Input";
import DiscountEditor from "./DiscountEditor";

/* ---------------------------------------------
   Types
--------------------------------------------- */

export interface PricingValue {
  originalPrice: string;
  salePrice?: string;

  discount: {
    enabled: boolean;
    type: "PERCENT" | "FLAT";
    value: string;
    startAt?: string;
    endAt?: string;
  };
}

interface Props {
  value: PricingValue | null;
  onChange: (val: PricingValue | null) => void;

  /** Enable override switch */
  optional?: boolean;

  label?: string;
}

/* ---------------------------------------------
   Defaults
--------------------------------------------- */

const EMPTY_PRICING: PricingValue = {
  originalPrice: "",
  salePrice: "",

  discount: {
    enabled: false,
    type: "PERCENT",
    value: "",
    startAt: "",
    endAt: "",
  },
};

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductPriceEditor({
  value,
  onChange,
  optional = false,
  label = "Pricing",
}: Props) {
  /* Override enabled when value exists */
  const enabled = optional ? value != null : true;

  /* ---------------------------------------------
     Toggle
  --------------------------------------------- */

  const toggleOverride = () => {
    if (!optional) return;

    if (enabled) {
      // Disable override → inherit
      onChange(null);
    } else {
      // Enable override → empty pricing
      onChange({ ...EMPTY_PRICING });
    }
  };

  /* ---------------------------------------------
     Update Helpers
  --------------------------------------------- */

  const update = (patch: Partial<PricingValue>) => {
    if (!value) return;

    onChange({
      ...value,
      ...patch,
    });
  };

  const updateDiscount = (patch: Partial<PricingValue["discount"]>) => {
    if (!value) return;

    update({
      discount: {
        ...value.discount,
        ...patch,
      },
    });
  };

  /* ---------------------------------------------
     Render
  --------------------------------------------- */

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>

        {/* Switch */}
        {optional && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">Override</span>

            <button
              type="button"
              onClick={toggleOverride}
              className={`
                relative inline-flex h-5 w-9 items-center rounded-full
                transition-colors
                ${enabled ? "bg-blue-600" : "bg-gray-300"}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white
                  transition-transform
                  ${enabled ? "translate-x-4" : "translate-x-1"}
                `}
              />
            </button>
          </div>
        )}
      </div>

      {/* Editor */}
      {(!optional || enabled) && value && (
        <div className="space-y-3 rounded-md border border-gray-200 bg-gray-50 p-3">
          {/* Prices */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              type="number"
              label="Original Price"
              value={value.originalPrice}
              onChange={(e) =>
                update({
                  originalPrice: e.target.value,
                })
              }
              min={0}
            />

            <Input
              type="number"
              label="Sale Price"
              value={value.salePrice || ""}
              onChange={(e) =>
                update({
                  salePrice: e.target.value,
                })
              }
              min={0}
            />
          </div>

          {/* Discount */}
          <DiscountEditor
            value={value.discount}
            onChange={(val) => updateDiscount(val)}
          />
        </div>
      )}

      {/* Helper */}
      {optional && !enabled && (
        <p className="text-xs text-gray-500">Using main product pricing</p>
      )}
    </div>
  );
}
