import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import "swiper/css";
import "swiper/css/navigation";

import type { CuratedShowcaseBlock } from "@/config/config.types";
import Card from "@/components/ui/card/Card";

interface Props {
  block: CuratedShowcaseBlock;
}

export default function CuratedCarouselSwiper({ block }: Props) {
  const { title, subtitle, items, maxItems } = block;

  const visibleItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-6xl py-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-600">{subtitle}</p>}
        </div>

        <div className="relative">
          {/* Navigation buttons */}
          <button className="swiper-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100">
            <FiChevronLeft size={22} />
          </button>

          <button className="swiper-next absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-100">
            <FiChevronRight size={22} />
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".swiper-prev",
              nextEl: ".swiper-next",
            }}
            spaceBetween={16}
            breakpoints={{
              480: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 }, // ✅ max 4
            }}
            className="!px-6"
          >
            {visibleItems.map((item) => (
              <SwiperSlide key={item.id} className="py-4">
                <Card
                  variant="curated"
                  link={item.link}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  description={item.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
