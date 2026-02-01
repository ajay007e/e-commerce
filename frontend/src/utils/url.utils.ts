import type {
  SearchUrlParams,
  SearchSortOption,
} from "@/config/business.types";

import {
  SORT_OPTIONS,
  VALID_PAGE_SIZES,
  DEFAULT_PAGE_SIZE,
} from "@/config/constants";
/**
 * Parse location.search into raw SearchUrlParams
 * Example: "?category=men,women&tag=sale&q=shoe&page=2"
 */
export function parseShopUrlParams(search: string): SearchUrlParams {
  const params = new URLSearchParams(search);

  const parseArray = (key: string): string[] | undefined => {
    const value = params.get(key);
    if (!value) return undefined;

    const items = value
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    return items.length ? Array.from(new Set(items)) : undefined;
  };

  const page = Number(params.get("page"));
  const pageSize = Number(params.get("pageSize"));
  return {
    q: params.get("q") ?? undefined,
    category: parseArray("category"),
    tags: parseArray("tag"),
    sort: params.get("sort") as SearchSortOption | undefined,
    page: Number.isFinite(page) ? page : undefined,
    pageSize: Number.isFinite(pageSize) ? pageSize : undefined,
  };
}

export function normalizeShopParams(params: SearchUrlParams): SearchUrlParams {
  const VALID_SORTS = SORT_OPTIONS.map((item) => item.value);
  return {
    q: params.q?.trim() || undefined,

    category:
      params.category && params.category.length ? params.category : undefined,

    tags: params.tags && params.tags.length ? params.tags : undefined,

    sort: VALID_SORTS.includes(params.sort!) ? params.sort : "relevance",

    page: params.page && params.page > 0 ? params.page : 1,

    pageSize: VALID_PAGE_SIZES.includes(params.pageSize!)
      ? params.pageSize
      : DEFAULT_PAGE_SIZE,
  };
}

export function buildShopUrl(params: SearchUrlParams): string {
  const searchParams = new URLSearchParams();

  if (params.q) {
    searchParams.set("q", params.q);
  }

  if (params.category?.length) {
    searchParams.set("category", params.category.join(","));
  }

  if (params.tags?.length) {
    searchParams.set("tag", params.tags.join(","));
  }

  if (params.sort && params.sort !== "relevance") {
    searchParams.set("sort", params.sort);
  }

  if (params.page && params.page > 1) {
    searchParams.set("page", String(params.page));
  }

  if (params.pageSize && params.pageSize != DEFAULT_PAGE_SIZE) {
    searchParams.set("pageSize", String(params.pageSize));
  }

  const queryString = searchParams.toString();
  return queryString ? `/shop?${queryString}` : "/shop";
}
