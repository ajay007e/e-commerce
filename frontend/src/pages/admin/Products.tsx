import { useEffect, useState } from "react";
import ProductDrawer from "./products/ProductDrawer";
import type { Product } from "./products/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [page, setPage] = useState(1);

  /* ================= LOAD ================= */

  const loadProducts = async () => {
    setProducts([]);
  };

  useEffect(() => {
    loadProducts();
  }, [page]);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      {/* Header (Dashboard Style) */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">Products</h1>

          <p className="text-sm text-gray-500">Manage products in your store</p>
        </div>

        {/* Add Button */}
        <button
          onClick={() => {
            setSelectedProduct(null);
            setDrawerOpen(true);
          }}
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

      {/* Drawer (Still Works) */}
      <ProductDrawer
        open={drawerOpen}
        product={selectedProduct}
        onClose={() => setDrawerOpen(false)}
        onSaved={loadProducts}
      />
    </div>
  );
}
