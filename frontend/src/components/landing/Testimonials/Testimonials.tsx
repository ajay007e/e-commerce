import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import { TESTIMONIAL_CONFIG } from "@/config/testimonial.config";
import type { TestimonialItem } from "@/config/config.types";
import Card from "@/components/ui/card/Card";

export default function Testimonials() {
  const {
    enabled,
    title,
    subtitle,
    items,
    autoPlay,
    autoPlayDelay = 5000,
  } = TESTIMONIAL_CONFIG;

  if (!enabled) return null;

  const visibleItems = items.filter((item: TestimonialItem) => item.enabled);

  if (visibleItems.length === 0) return null;

  return (
    <section className="px-4 py-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-semibold">{title}</h2>
          {subtitle && <p className="mt-3 text-sm text-gray-600">{subtitle}</p>}
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={visibleItems.length > 1}
          pagination={{ clickable: true }}
          autoplay={
            autoPlay
              ? {
                  delay: autoPlayDelay,
                  disableOnInteraction: false,
                }
              : false
          }
        >
          {visibleItems.map((item) => (
            <SwiperSlide key={item.id}>
              <Card
                type="testimonial"
                name={item.name}
                quote={item.quote}
                avatarUrl={item.avatarUrl}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
