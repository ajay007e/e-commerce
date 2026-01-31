import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import type { CategoryShowcaseBlock } from "@/config/config.types";
import Card from "@/components/ui/card/Card";

interface Props {
  block: CategoryShowcaseBlock;
}

export default function CategoryCarouselSwiper({ block }: Props) {
  const { title, subtitle, items, maxItems, autoScrollInterval = 4000 } = block;

  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <section className="px-4 py-8">
      {/* Width constrained */}
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay]}
          loop
          autoplay={{
            delay: autoScrollInterval,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }, // ✅ max 4
          }}
          className="overflow-hidden"
        >
          {visibleItems.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                variant="category"
                link={item.link}
                imageUrl={item.imageUrl}
                name={item.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
