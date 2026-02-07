import { useCallback, useEffect, useState } from "react";

import ProductDrawer from "./products/ProductDrawer";
import type { Product } from "./products/types";

import { getProducts } from "@/api/products.api";

/* Components */
import ProductTableHeader from "./products/ProductTableHeader";
import ProductTable from "./products/ProductTable";
import ProductPagination from "./products/ProductPagination";

/* ---------------------------------------------
   Component
--------------------------------------------- */

export default function ProductsPage() {
  /* ---------------------------------------------
     State
  --------------------------------------------- */

  /* Data */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  /* Filters */
  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);

  /* Pagination */
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  /* Drawer */
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  /* ---------------------------------------------
     Build Query
  --------------------------------------------- */

  const buildQuery = () => {
    const query: any = {};

    query.page = page;
    query.limit = limit;

    if (search.trim()) {
      query.search = search.trim();
    }

    if (categoryId) {
      query.categoryId = categoryId;
    }

    return query;
  };

  /* ---------------------------------------------
     Load Products
  --------------------------------------------- */

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);

      const params = buildQuery();

      const res = await getProducts(params);

      if (res?.status) {
        setProducts(res.products || []);

        if (res.page?.totalPages) {
          setTotalPages(res.page.totalPages);
        } else {
          setTotalPages(1);
        }
      } else {
        setProducts([]);
        setTotalPages(1);
      }
    } catch (err) {
      console.error("Load products failed:", err);

      setProducts([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, categoryId]);

  /* ---------------------------------------------
     Effects
  --------------------------------------------- */

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /* ---------------------------------------------
     Handlers
  --------------------------------------------- */

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setDrawerOpen(true);
  };

  const handleRowClick = (product: Product) => {
    setSelectedProduct(product);
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
    setSelectedProduct(null);
  };

  const handleSaved = () => {
    loadProducts();
    handleCloseDrawer();
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategoryId(null);
    setPage(1);
  };

  /* ---------------------------------------------
     UI
  --------------------------------------------- */

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Products</h1>

          <p className="text-sm text-gray-500">Manage products in your store</p>
        </div>

        {/* Add Button */}
        <button
          onClick={handleAddProduct}
          className="
            inline-flex items-center gap-2
            rounded-md bg-gray-900
            px-4 py-2 text-sm
            font-medium text-white
            hover:bg-gray-800
            focus:outline-none
            focus:ring-2
            focus:ring-gray-900
          "
        >
          + Add Product
        </button>
      </div>

      {/* Header: Search + Filters */}
      <ProductTableHeader
        search={search}
        categoryId={categoryId}
        onSearchChange={(val) => {
          setSearch(val);
          setPage(1);
        }}
        onCategoryChange={(val) => {
          setCategoryId(val);
          setPage(1);
        }}
        onReset={handleResetFilters}
      />

      {/* Table */}
      <ProductTable
        products={products}
        loading={loading}
        onRowClick={handleRowClick}
      />

      {/* Pagination */}
      <ProductPagination
        page={page}
        totalPages={totalPages}
        onPageChange={(p) => setPage(p)}
      />

      {/* Drawer (Create / Edit) */}
      <ProductDrawer
        open={drawerOpen}
        product={selectedProduct || undefined}
        onClose={handleCloseDrawer}
        onSaved={handleSaved}
      />
    </div>
  );
}
