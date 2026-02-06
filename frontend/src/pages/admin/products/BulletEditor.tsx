import { FaPlus, FaTimes } from "react-icons/fa";

interface Props {
  label: string;
  value: string[];
  onChange: (val: string[]) => void;
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

export default function BulletEditor({ label, value, onChange, error }: Props) {
  const addBullet = () => {
    onChange([...value, ""]);
  };

  const updateBullet = (i: number, text: string) => {
    const updated = [...value];
    updated[i] = text;
    onChange(updated);
  };

  const removeBullet = (i: number) => {
    onChange(value.filter((_, index) => index !== i));
  };

  return (
    <div className="space-y-2">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700">{label}</label>

      {/* Rows */}
      <div className="space-y-2">
        {value.map((bullet, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              value={bullet}
              onChange={(e) => updateBullet(i, e.target.value)}
              placeholder="Enter point..."
              className={inputBase}
            />

            <button
              type="button"
              onClick={() => removeBullet(i)}
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
        ))}
      </div>

      {/* Add */}
      <button
        type="button"
        onClick={addBullet}
        className="
          inline-flex items-center gap-2
          text-sm font-medium text-blue-600
          hover:text-blue-700
        "
      >
        <FaPlus size={12} />
        Add item
      </button>

      {/* Error */}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
