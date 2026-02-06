import { Input, Select } from "@/components/ui/Input";

interface AvailabilityValue {
  status: "AVAILABLE" | "OUT_OF_STOCK" | "PREORDER";
  reason?: string;
}

interface Props {
  value?: AvailabilityValue;
  onChange: (val: AvailabilityValue) => void;
  error?: string;
}

export default function AvailabilityEditor({ value, onChange, error }: Props) {
  const availability: AvailabilityValue = value ?? {
    status: "AVAILABLE",
    reason: "",
  };

  const update = (patch: Partial<AvailabilityValue>) => {
    onChange({
      ...availability,
      ...patch,
    });
  };

  const needsReason =
    availability.status === "OUT_OF_STOCK" ||
    availability.status === "PREORDER";

  return (
    <div className="space-y-3">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Availability
      </label>

      {/* Status */}
      <Select
        value={availability.status}
        onChange={(e) =>
          update({
            status: e.target.value as AvailabilityValue["status"],
            reason: "",
          })
        }
        options={[
          { label: "Available", value: "AVAILABLE" },
          { label: "Out of Stock", value: "OUT_OF_STOCK" },
          { label: "Preorder", value: "PREORDER" },
        ]}
      />

      {/* Reason */}
      {needsReason && (
        <Input
          label="Reason"
          placeholder="Eg. Next batch in production"
          value={availability.reason ?? ""}
          onChange={(e) => update({ reason: e.target.value })}
        />
      )}

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
