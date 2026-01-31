import type { AuthFieldProps } from "./types";

export function AuthField({
  label,
  type = "text",
  value,
  error,
  onChange,
}: AuthFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-neutral-700">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
