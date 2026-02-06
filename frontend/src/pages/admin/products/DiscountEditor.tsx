import { Input, Select, Switch } from "@/components/ui/Input";

interface DiscountValue {
  enabled: boolean;
  type: "PERCENT" | "FLAT";
  value: string;
  startAt: string;
  endAt: string;
}

interface Props {
  value?: DiscountValue;
  onChange: (val: DiscountValue) => void;
  error?: string;
}

export default function DiscountEditor({ value, onChange }: Props) {
  const discount: DiscountValue = value ?? {
    enabled: false,
    type: "PERCENT",
    value: "",
    startAt: "",
    endAt: "",
  };

  const update = (patch: Partial<DiscountValue>) => {
    onChange({
      ...discount,
      ...patch,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Discount</label>

        <Switch
          checked={discount.enabled}
          onChange={(e) => update({ enabled: e.target.checked })}
        />
      </div>

      {discount.enabled && (
        <div className="rounded-md border border-gray-200 p-3 space-y-3">
          <Select
            label="Type"
            value={discount.type}
            onChange={(e) =>
              update({
                type: e.target.value as any,
              })
            }
            options={[
              { label: "Percent", value: "PERCENT" },
              { label: "Flat", value: "FLAT" },
            ]}
          />

          <Input
            label="Value"
            type="number"
            value={discount.value}
            onChange={(e) => update({ value: e.target.value })}
          />

          <Input
            label="Start Date"
            type="datetime-local"
            value={discount.startAt}
            onChange={(e) => update({ startAt: e.target.value })}
          />

          <Input
            label="End Date"
            type="datetime-local"
            value={discount.endAt}
            onChange={(e) => update({ endAt: e.target.value })}
          />
        </div>
      )}
    </div>
  );
}
