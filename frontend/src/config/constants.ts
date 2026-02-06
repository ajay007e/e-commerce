export const SORT_OPTIONS: {
  label: string;
  value: SearchSortOption;
}[] = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

export const VALID_PAGE_SIZES = [10, 25, 50, 100];
export const DEFAULT_PAGE_SIZE = 25;

export const BREADCRUMB_LABELS: Record<string, string> = {
  admin: "Dashboard",
  products: "Products",
  categories: "Categories",
  orders: "Orders",
  users: "Users",
  sizes: "Sizes",
  settings: "Settings",
  homepage: "Homepage",
  hero: "Hero",
  featured: "Featured",
  visibility: "Visibility",
  pages: "Pages",
  config: "Global Config",
  showcase: "Showcase",
};
