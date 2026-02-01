export type SearchSource =
  | "search" // from global search
  | "category" // from category page
  | "tag"; // from tag click

export interface SearchUrlParams {
  q?: string; // search query
  category?: string[]; // flat category ids
  tags?: string[]; // flat tag ids
  sort?: SearchSortOption;
  page?: number;
  offset?: number;
}

export type SearchSortOption =
  | "relevance"
  | "price_asc"
  | "price_desc"
  | "newest";

export interface SearchFilterState {
  category: string[];
  tags: string[];
}

export interface SearchFacetItem {
  id: string;
  label: string;
  count?: number;
}

export interface SearchFacets {
  categories: SearchFacetItem[];
  tags: SearchFacetItem[];
}

export interface ProductRating {
  value: number; // 0–5
  count?: number;
}

export interface ProductSellingInfo {
  icon?: "fire" | "users" | "alert";
  text: string;
}

export interface ProductImageTag {
  label: string; // e.g. "New", "Featured"
  variant?: "primary" | "secondary";
}

export interface SearchProductItem {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;

  price: number; // selling price
  originalPrice?: number; // MRP
  discountRate?: number; // % off (precomputed)

  rating?: ProductRating;

  imageTags?: ProductImageTag[];

  isWishlisted?: boolean;
  isAvailable?: boolean;

  sellingInfo?: ProductSellingInfo;
}

export interface SearchResultsResponse {
  items: SearchProductItem[];
  total: number;
  page: number;
  pageSize: number;
  facets: SearchFacets;
}

export interface SearchPageState {
  source: SearchSource;
  appliedFilters: SearchFilterState;
  draftFilters: SearchFilterState;
  sort: SearchSortOption;
  query?: string;
}

export interface ShopSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export interface ProductGridProps {
  items: SearchProductItem[];
  isLoading: boolean;
  onClearFilters?: () => void;
}
