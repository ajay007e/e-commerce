interface PageSizeSelectProps {
  value: number;
  options: number[];
  onChange: (pageSize: number) => void;
}

export function PageSizeSelect({
  value,
  options,
  onChange,
}: PageSizeSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="page-size" className="text-sm text-gray-600">
        Show
      </label>

      <select
        id="page-size"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="rounded-md border border-gray-300 px-2 py-1 text-sm focus:border-gray-900 focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
