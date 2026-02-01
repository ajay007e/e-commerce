import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { ShopHeader } from "@/components/shop/Header/ShopHeader";
import { FilterSidebar } from "@/components/shop/Filter/FilterSidebar";
import { MobileFilterButton } from "@/components/shop/Filter/MobileFilterButton";
import { MobileFilterSheet } from "@/components/shop/Filter/MobileFilterSheet";
import { ProductGrid } from "@/components/shop/Grid/ProductGrid";
import { Pagination } from "@/components/shop/Pagination/Pagination";

import type {
  SearchProductItem,
  SearchSortOption,
  SearchFilterState,
  SearchFacets,
} from "@/config/business.types";

import {
  parseShopUrlParams,
  normalizeShopParams,
  buildShopUrl,
} from "@/utils/url.utils";

/* ================= MOCK DATA (TEMP) ================= */

export const MOCK_PRODUCTS: SearchProductItem[] = [
  {
    id: "p1",
    name: "Men's Running Shoes",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    price: 2999,
    originalPrice: 3999,
    discountRate: 25,
    rating: { value: 4.5, count: 120 },
    imageTags: [{ label: "Featured" }],
    isWishlisted: true,
    isAvailable: true,
    sellingInfo: {
      icon: "fire",
      text: "Only 2 left · Selling fast",
    },
  },
  {
    id: "p2",
    name: "Women's Casual Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    price: 2499,
    originalPrice: 3299,
    discountRate: 24,
    rating: { value: 4.2, count: 86 },
    imageTags: [{ label: "New" }],
    isAvailable: true,
    sellingInfo: {
      icon: "users",
      text: "40+ bought last week",
    },
  },
  {
    id: "p3",
    name: "Lightweight Sports Shoes",
    imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
    price: 1999,
    rating: { value: 4.0, count: 54 },
    isAvailable: true,
  },
  {
    id: "p4",
    name: "Everyday Walking Shoes",
    imageUrl: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
    price: 1799,
    originalPrice: 2199,
    discountRate: 18,
    rating: { value: 3.8, count: 33 },
    imageTags: [{ label: "Limited", variant: "secondary" }],
    isAvailable: false,
    sellingInfo: {
      icon: "alert",
      text: "Out of stock in most sizes",
    },
  },
  {
    id: "p5",
    name: "High Performance Trainers",
    imageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1",
    price: 3499,
    originalPrice: 4299,
    discountRate: 19,
    rating: { value: 4.7, count: 210 },
    imageTags: [{ label: "Featured" }],
    isWishlisted: true,
    isAvailable: true,
    sellingInfo: {
      icon: "fire",
      text: "Top rated · Limited stock",
    },
  },
  {
    id: "p6",
    name: "Minimalist White Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1528701800489-20be3c8c86b4",
    price: 2199,
    imageTags: [{ label: "New" }],
    rating: { value: 4.1, count: 67 },
    isAvailable: true,
  },
  {
    id: "p7",
    name: "Trail Running Shoes",
    imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    price: 3299,
    originalPrice: 3799,
    discountRate: 13,
    rating: { value: 4.3, count: 98 },
    isAvailable: true,
    sellingInfo: {
      icon: "users",
      text: "Popular with outdoor runners",
    },
  },
  {
    id: "p8",
    name: "Slip-On Comfort Shoes",
    imageUrl: "https://images.unsplash.com/photo-1605405740214-7f3b7e6fbbd5",
    price: 1899,
    rating: { value: 3.9, count: 41 },
    isAvailable: true,
  },
  {
    id: "p9",
    name: "Premium Leather Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16",
    price: 4599,
    originalPrice: 5599,
    discountRate: 18,
    rating: { value: 4.6, count: 152 },
    imageTags: [{ label: "Featured" }],
    isAvailable: true,
    sellingInfo: {
      icon: "users",
      text: "Bestseller this month",
    },
  },
];

/* ================= PAGE ================= */

const DEFAULT_PAGE_SIZE = 25;

export default function ShopPage() {
  const location = useLocation();
  const navigate = useNavigate();

  /* ========== STATE (URL-DERIVED) ========== */

  const [appliedFilters, setAppliedFilters] = useState<SearchFilterState>({
    category: [],
    tags: [],
  });

  const [draftFilters, setDraftFilters] = useState<SearchFilterState>({
    category: [],
    tags: [],
  });

  const [sort, setSort] = useState<SearchSortOption>("relevance");

  const [query, setQuery] = useState("");

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  /* ========== FACETS (TEMP) ========== */

  const facets: SearchFacets = {
    categories: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
    ],
    tags: [
      { id: "sale", label: "On Sale" },
      { id: "new", label: "New Arrivals" },
    ],
  };

  /* ========== URL READ ========== */

  useEffect(() => {
    const parsed = normalizeShopParams(parseShopUrlParams(location.search));

    const nextApplied: SearchFilterState = {
      category: parsed.category ?? [],
      tags: parsed.tags ?? [],
    };

    setAppliedFilters(nextApplied);
    setDraftFilters(nextApplied);
    setSort(parsed.sort ?? "relevance");
    setQuery(parsed.q ?? "");
    setPage(parsed.page ?? 1);
    setPageSize(parsed.pageSize ?? DEFAULT_PAGE_SIZE);
  }, [location.search]);

  /* ========== URL WRITE HELPERS ========== */

  const updateUrl = (
    next: Partial<{
      q: string;
      category: string[];
      tags: string[];
      sort: SearchSortOption;
      page: number;
      pageSize: number;
    }>,
  ) => {
    navigate(
      buildShopUrl({
        q: (next.q ?? query) || undefined,
        category: next.category ?? appliedFilters.category,
        tags: next.tags ?? appliedFilters.tags,
        sort: next.sort ?? sort,
        page: next.page ?? page,
        pageSize: next.pageSize ?? pageSize,
      }),
    );
  };

  /* ========== HANDLERS ========== */

  const handleSearchSubmit = () => updateUrl({ page: 1 });

  const handleApplyFilters = () =>
    updateUrl({
      category: draftFilters.category,
      tags: draftFilters.tags,
      page: 1,
    });

  const handleSortChange = (nextSort: SearchSortOption) =>
    updateUrl({
      sort: nextSort,
      page: 1,
    });

  const handlePageChange = (nextPage: number) => updateUrl({ page: nextPage });

  const handlePageSizeChange = (nextSize: number) =>
    updateUrl({
      pageSize: nextSize,
      page: 1,
    });

  /* ========== MOCK PAGING (TEMP) ========== */

  const totalResults = MOCK_PRODUCTS.length;

  const pagedProducts = MOCK_PRODUCTS.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const appliedCount =
    appliedFilters.category.length + appliedFilters.tags.length;

  /* ========== UI ========== */

  return (
    <main className="bg-white">
      {/* Header */}
      <section className="border-b px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <ShopHeader
            totalResults={totalResults}
            sort={sort}
            searchValue={query}
            onSearchChange={setQuery}
            onSearchSubmit={handleSearchSubmit}
            onSortChange={handleSortChange}
          />
        </div>
      </section>

      {/* Content */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
          {/* Filters */}
          <aside className="hidden lg:block">
            <div className="sticky top-4 rounded-md border p-4">
              <FilterSidebar
                facets={facets}
                draftFilters={draftFilters}
                appliedFilters={appliedFilters}
                onDraftChange={setDraftFilters}
                onApply={handleApplyFilters}
                onClear={() => setDraftFilters(appliedFilters)}
              />
            </div>
          </aside>

          {/* Products */}
          <section>
            <div className="mb-4 lg:hidden">
              <MobileFilterButton
                appliedCount={appliedCount}
                onOpen={() => setMobileFiltersOpen(true)}
              />
            </div>

            <ProductGrid
              items={pagedProducts}
              isLoading={false}
              onClearFilters={() => setDraftFilters(appliedFilters)}
            />

            <Pagination
              currentPage={page}
              pageSize={pageSize}
              totalResults={totalResults}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
            />
          </section>
        </div>
      </section>

      {/* Mobile Filters */}
      <MobileFilterSheet
        open={mobileFiltersOpen}
        facets={facets}
        draftFilters={draftFilters}
        appliedFilters={appliedFilters}
        onDraftChange={setDraftFilters}
        onApply={() => {
          handleApplyFilters();
          setMobileFiltersOpen(false);
        }}
        onClear={() => setDraftFilters(appliedFilters)}
        onClose={() => setMobileFiltersOpen(false)}
      />
    </main>
  );
}
