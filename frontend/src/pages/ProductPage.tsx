import { useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { ProductMedia } from "@/components/product/ProductMedia";
import { ProductSummary } from "@/components/product/ProductSummary";
import { ProductDetailsSection } from "@/components/product/ProductDetailsSection";
import { ProductRatingsSection } from "@/components/product/ProductRatingsSection";
import { ProductRecommendationsSection } from "@/components/product/ProductRecommendationsSection";
import { MobileStickyCTA } from "@/components/product/MobileStickyCTA";

import { MOCK_PRODUCT_DETAILS } from "@/config/product.mock";

export default function ProductDetailsPage() {
  const { productId } = useParams<{ productId: string }>();
  const product = MOCK_PRODUCT_DETAILS;

  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState<string | undefined>();

  const ratingsRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-white">
      {/* ===== TOP ===== */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl grid grid-cols-1 gap-8 md:grid-cols-[520px_1fr]">
          {/* Media */}
          <ProductMedia images={product.images} />

          {/* Summary */}
          <ProductSummary
            title={product.title}
            description={product.description}
            rating={{
              value: product.rating.average,
              count: product.rating.count,
            }}
            price={product.price}
            originalPrice={product.originalPrice}
            discountRate={product.discountRate}
            variants={product.variants}
            sizes={product.sizes}
            isWishlisted={isWishlisted}
            deliveryInfo={product.deliveryInfo}
            offers={product.offers}
            onToggleWishlist={() => setIsWishlisted((v) => !v)}
            onAddToCart={({ sizeId }) => setSelectedSizeId(sizeId)}
            onReviewLinkClick={() =>
              ratingsRef.current?.scrollIntoView({
                behavior: "smooth",
              })
            }
          />
        </div>
      </section>

      {/* ===== DETAILS ===== */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <ProductDetailsSection
            details={product.details}
            sizeAndFit={product.sizeAndFit}
            materialAndCare={product.materialAndCare}
            specifications={product.specifications}
          />
        </div>
      </section>

      {/* ===== RATINGS ===== */}
      <section ref={ratingsRef} className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <ProductRatingsSection
            averageRating={product.rating.average}
            totalReviews={product.rating.count}
            distribution={product.rating.distribution}
            reviews={product.reviews}
          />
        </div>
      </section>

      {/* ===== SIMILAR ===== */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <ProductRecommendationsSection
            title="Similar Products"
            products={product.similarProducts}
          />
        </div>
      </section>

      {/* ===== ALSO LIKE ===== */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <ProductRecommendationsSection
            title="Customers Also Like"
            products={product.customersAlsoLike}
          />
        </div>
      </section>

      {/* ===== MOBILE CTA ===== */}
      <MobileStickyCTA
        isAddToCartDisabled={!selectedSizeId}
        isWishlisted={isWishlisted}
        onAddToCart={() =>
          console.log("Add to cart", productId, selectedSizeId)
        }
        onToggleWishlist={() => setIsWishlisted((v) => !v)}
      />
    </main>
  );
}
