import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Keyboard } from "swiper/modules";
import { FiX } from "react-icons/fi";

import "swiper/css";
import "swiper/css/thumbs";

interface ProductImage {
  id: string;
  url: string;
  alt?: string;
}

interface ProductMediaProps {
  images: ProductImage[];
}

export function ProductMedia({ images }: ProductMediaProps) {
  const [inlineThumbs, setInlineThumbs] = useState<any>(null);
  const [modalThumbs, setModalThumbs] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ===== Lock body scroll when modal open ===== */
  useEffect(() => {
    if (!isModalOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  if (!images.length) {
    return (
      <div className="aspect-square bg-gray-100 rounded-md flex items-center justify-center text-sm text-gray-400">
        No images
      </div>
    );
  }

  return (
    <>
      {/* ================= INLINE GALLERY ================= */}
      <div className="flex h-[520px] gap-4">
        {/* ---- Thumbnails (desktop) ---- */}
        <div className="hidden md:block w-20">
          <Swiper
            onSwiper={setInlineThumbs}
            direction="vertical"
            slidesPerView={4}
            spaceBetween={8}
            watchSlidesProgress
            className="h-full"
          >
            {images.map((img, i) => (
              <SwiperSlide key={img.id}>
                <div
                  className={`aspect-square cursor-pointer overflow-hidden rounded border ${
                    i === activeIndex ? "border-gray-900" : "border-transparent"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={img.alt ?? ""}
                    className="h-full w-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* ---- Main Image ---- */}
        <div className="flex-1 rounded-md overflow-hidden ">
          <Swiper
            modules={[Thumbs]}
            thumbs={{
              swiper:
                inlineThumbs && !inlineThumbs.destroyed ? inlineThumbs : null,
            }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            className="h-full"
          >
            {images.map((img) => (
              <SwiperSlide key={img.id}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="h-full w-full flex items-center justify-center cursor-zoom-in"
                >
                  <div className="aspect-[4/5] w-full max-w-[520px] bg-gray-100 flex items-center justify-center">
                    <img
                      src={img.url}
                      alt={img.alt ?? ""}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90"
          role="dialog"
          aria-modal
          onClick={() => setIsModalOpen(false)}
        >
          {/* Close */}
          <button
            aria-label="Close gallery"
            onClick={() => setIsModalOpen(false)}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white"
          >
            <FiX size={20} />
          </button>

          <div
            className="flex h-full w-full items-center justify-center px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full max-h-[90vh] w-full max-w-5xl flex-col">
              {/* Main */}
              <div className="flex-1 overflow-hidden">
                <Swiper
                  modules={[Thumbs, Keyboard]}
                  keyboard
                  initialSlide={activeIndex}
                  thumbs={{
                    swiper:
                      modalThumbs && !modalThumbs.destroyed
                        ? modalThumbs
                        : null,
                  }}
                  className="h-full"
                >
                  {images.map((img) => (
                    <SwiperSlide key={img.id}>
                      <div className="h-full flex items-center justify-center">
                        <img
                          src={img.url}
                          alt={img.alt ?? ""}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              {/* Thumbs */}
              <div className="mt-4 shrink-0">
                <Swiper
                  onSwiper={setModalThumbs}
                  slidesPerView={5}
                  spaceBetween={8}
                >
                  {images.map((img) => (
                    <SwiperSlide key={img.id}>
                      <div className="aspect-square overflow-hidden rounded">
                        <img
                          src={img.url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
