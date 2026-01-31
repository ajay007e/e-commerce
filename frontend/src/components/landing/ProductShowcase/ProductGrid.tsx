import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiHeart } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import type { ProductShowcaseBlock } from "@/config/config.types";
import Card from "@/components/ui/card/Card";

interface Props {
  block: ProductShowcaseBlock;
}

export default function ProductCarouselSwiper({ block }: Props) {
  const { title, subtitle, items, maxItems } = block;
  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl">
        {/* Header row */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold">{title}</h2>
            {subtitle && (
              <p className="mt-3 text-sm text-gray-600">{subtitle}</p>
            )}
          </div>

          {/* Navigation icons */}
          <div className="flex items-center gap-2">
            <button
              className="
                product-prev rounded-full border bg-white p-2
                text-gray-700 shadow-sm
                hover:bg-gray-100
                disabled:opacity-40
              "
              aria-label="Previous products"
            >
              <FiChevronLeft size={18} />
            </button>

            <button
              className="
                product-next rounded-full border bg-white p-2
                text-gray-700 shadow-sm
                hover:bg-gray-100
                disabled:opacity-40
              "
              aria-label="Next products"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".product-prev",
            nextEl: ".product-next",
          }}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }, // ✅ max 4
          }}
        >
          {visibleItems.map((product, index) => (
            <SwiperSlide key={`${product.id}-${index}`}>
              <Card
                variant="product"
                link={product.link}
                imageUrl={product.imageUrl}
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                discountLabel={product.discountLabel}
                onWishlistClick={() => console.log("wishlist")}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
