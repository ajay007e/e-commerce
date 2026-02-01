import type { ShopSearchInputProps } from "@/config/business.types";

export function SearchInput({
  value,
  onChange,
  onSubmit,
}: ShopSearchInputProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="w-full"
    >
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products"
        className="
          w-full
          rounded-md
          border border-gray-300
          px-4 py-2
          text-sm
          focus:border-gray-900 focus:outline-none
        "
      />
    </form>
  );
}
