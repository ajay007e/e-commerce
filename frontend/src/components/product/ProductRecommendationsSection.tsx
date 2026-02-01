import type { SearchProductItem } from "@/config/business.types";
import { ProductCard } from "@/components/ui/card/ProductCard";

interface ProductRecommendationsSectionProps {
  title: string;
  subtitle?: string;
  products: SearchProductItem[];
  onProductClick?: (productId: string) => void;
}

export function ProductRecommendationsSection({
  title,
  subtitle,
  products,
  onProductClick,
}: ProductRecommendationsSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="space-y-4">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick?.(product.id)}
          />
        ))}
      </div>
    </section>
  );
}
