import { useEffect, useMemo, useState } from "react";
import { TOP_BANNER_CONFIG, TOP_BANNERS } from "@/config/top-banner.config";
import type { TopBannerItem } from "@/config/config.types";

/**
 * LocalStorage key for permanently dismissed banners
 */
const STORAGE_KEY = "v0:dismissed_top_banners";

/**
 * Banner type → styles
 */
const typeStyles: Record<TopBannerItem["type"], string> = {
  info: "bg-gray-100 text-gray-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
};

/**
 * Read permanently dismissed banners
 */
const getStoredDismissed = (): string[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

export default function TopBanner() {
  const { enabled, mode, rotateInterval } = TOP_BANNER_CONFIG;

  const [closed, setClosed] = useState<string[]>(getStoredDismissed());
  const [activeIndex, setActiveIndex] = useState(0);

  const isBannerActiveByTime = (banner: TopBannerItem): boolean => {
    const now = Date.now();

    if (banner.startsAt && now < new Date(banner.startsAt).getTime()) {
      return false;
    }

    if (banner.endsAt && now > new Date(banner.endsAt).getTime()) {
      return false;
    }

    return true;
  };

  /**
   * Active banners (enabled + not dismissed)
   */
  const activeBanners = useMemo(() => {
    const banners = TOP_BANNERS.filter((b) => b.enabled)
      .filter(isBannerActiveByTime)
      .filter((b) => !closed.includes(b.id))
      .sort((a, b) => a.priority - b.priority);

    if (
      TOP_BANNER_CONFIG.mode === "stack" &&
      TOP_BANNER_CONFIG.stackLimit &&
      TOP_BANNER_CONFIG.stackLimit > 0
    ) {
      return banners.slice(0, TOP_BANNER_CONFIG.stackLimit);
    }

    return banners;
  }, [closed]);

  /**
   * Carousel rotation (no animation logic here)
   */
  useEffect(() => {
    if (mode !== "carousel") return;
    if (activeBanners.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev + 1 >= activeBanners.length ? 0 : prev + 1,
      );
    }, rotateInterval ?? 4000);

    return () => clearInterval(interval);
  }, [mode, activeBanners.length, rotateInterval]);

  /**
   * Dismiss logic (per banner)
   */
  const dismissBanner = (banner: TopBannerItem) => {
    if (banner.dismiss === "none") return;

    if (banner.dismiss === "session") {
      setClosed((prev) => [...prev, banner.id]);
    }

    if (banner.dismiss === "always") {
      const updated = [...closed, banner.id];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setClosed(updated);
    }
  };

  /**
   * Render banner (simple + centered)
   */
  const renderBanner = (banner: TopBannerItem, key?: string) => {
    return (
      <div
        key={key ?? banner.id}
        className={`
          relative px-4 py-2 text-sm text-center
          transition-opacity duration-500 ease-in-out
          opacity-100
          ${typeStyles[banner.type]}
        `}
      >
        <span className="block">{banner.message}</span>

        {banner.dismiss !== "none" && (
          <button
            onClick={() => dismissBanner(banner)}
            className="absolute right-3 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100"
            aria-label="Close banner"
          >
            ✕
          </button>
        )}
      </div>
    );
  };

  /**
   * Guards
   */
  if (!enabled) return null;
  if (activeBanners.length === 0) return null;

  /**
   * Modes
   */
  if (mode === "single") {
    return renderBanner(activeBanners[0]);
  }

  if (mode === "stack") {
    return <>{activeBanners.map(renderBanner)}</>;
  }

  // carousel (fade transition via key change)
  const banner = activeBanners[activeIndex];
  return (
    <div className="overflow-hidden">
      {renderBanner(banner, `${banner.id}-${activeIndex}`)}
    </div>
  );
}
