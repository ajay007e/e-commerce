import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { HERO_CONFIG } from "@/config/hero.config";
import type { HeroSlide } from "@/config/config.types";

export default function HeroSection() {
  const {
    enabled,
    slides,
    autoRotateInterval = 6000,
    maxSlides = 3,
    textTransition = {},
  } = HERO_CONFIG;

  const {
    subTextDelay = 200,
    headlineDelay = 600,
    ctaDelay = 1000,
  } = textTransition;

  const heroSlides: HeroSlide[] = slides.slice(0, maxSlides);

  if (!enabled || heroSlides.length === 0) return null;

  return (
    <section className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={heroSlides.length > 1}
        autoplay={{
          delay: autoRotateInterval,
          pauseOnMouseEnter: true,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletClass: "hero-dot",
          bulletActiveClass: "hero-dot-active",
        }}
        className="h-full w-full
              [&_.swiper-pagination]:bottom-0
              [&_.swiper-pagination]:flex
              [&_.swiper-pagination]:justify-center
              [&_.swiper-pagination]:w-auto
            "
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={`${slide.id}-${index}`}>
            {/* Background */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.imageUrl})` }}
              role="img"
              aria-label={slide.altText}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex h-full items-center justify-center px-6">
              <div className="max-w-3xl text-center text-white">
                {/* Subtext */}
                <p
                  className="mb-2 text-sm uppercase tracking-wide opacity-0 animate-fade-in"
                  style={{ animationDelay: `${subTextDelay}ms` }}
                >
                  {slide.subText}
                </p>

                {/* Headline */}
                <h1
                  className="mb-6 text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl opacity-0 animate-fade-in"
                  style={{ animationDelay: `${headlineDelay}ms` }}
                >
                  {slide.headline}
                </h1>

                {/* CTA */}
                <Link
                  to={slide.ctaLink}
                  className="inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-gray-100 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${ctaDelay}ms` }}
                >
                  {slide.ctaLabel}
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
