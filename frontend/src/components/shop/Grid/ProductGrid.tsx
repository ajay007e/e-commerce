import type { ProductGridProps } from "@/config/business.types";

import { ProductGridSkeleton } from "./ProductGridSkeleton";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "@/components/ui/card/ProductCard";

export function ProductGrid({
  items,
  isLoading,
  onClearFilters,
}: ProductGridProps) {
  if (isLoading) {
    return <ProductGridSkeleton />;
  }

  if (items.length === 0) {
    return <EmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleWishlist={(id) => {
            // update state / call API later
            console.log("Toggle wishlist:", id);
          }}
        />
      ))}
    </div>
  );
}
