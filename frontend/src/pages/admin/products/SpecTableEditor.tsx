import { FaPlus, FaTimes } from "react-icons/fa";

export interface SpecItem {
  label: string;
  value: string;
}

interface Props {
  value: SpecItem[];
  onChange: (val: SpecItem[]) => void;
  error?: string;
}

const inputBase = `
  w-full rounded-md border border-gray-300
  bg-white px-3 py-2 text-sm
  text-gray-900 placeholder-gray-400
  transition
  focus:outline-none
  focus:ring-2 focus:ring-blue-500
  focus:border-blue-500
`;

export default function SpecTableEditor({ value, onChange, error }: Props) {
  const addRow = () => {
    onChange([...value, { label: "", value: "" }]);
  };

  const updateRow = (index: number, field: "label" | "value", text: string) => {
    const updated = [...value];

    updated[index] = {
      ...updated[index],
      [field]: text,
    };

    onChange(updated);
  };

  const removeRow = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">
        Specifications
      </label>

      {/* Rows */}
      <div className="space-y-2">
        {value.map((row, i) => (
          <div key={i} className="grid grid-cols-12 gap-2 items-center">
            {/* Label */}
            <div className="col-span-5">
              <input
                value={row.label}
                onChange={(e) => updateRow(i, "label", e.target.value)}
                placeholder="Label"
                className={inputBase}
              />
            </div>

            {/* Value */}
            <div className="col-span-6">
              <input
                value={row.value}
                onChange={(e) => updateRow(i, "value", e.target.value)}
                placeholder="Value"
                className={inputBase}
              />
            </div>

            {/* Remove */}
            <div className="col-span-1 flex justify-end">
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-md border border-gray-300
                  text-gray-400
                  hover:bg-red-50 hover:text-red-600
                  transition
                "
              >
                <FaTimes size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add */}
      <button
        type="button"
        onClick={addRow}
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-blue-600
          hover:text-blue-700
        "
      >
        <FaPlus size={12} />
        Add specification
      </button>

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
