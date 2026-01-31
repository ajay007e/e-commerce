import type { TopBannerConfig, TopBannerItem } from "./config.types";

export const TOP_BANNER_CONFIG: TopBannerConfig = {
  enabled: true,
  mode: "single", // single | stack | carousel
  source: "static",
  stackLimit: 2,
  rotateInterval: 4000,
};

export const TOP_BANNERS: TopBannerItem[] = [
  {
    id: "summer-sale",
    type: "success",
    message: "🌞 Summer Sale! Flat 30% off",
    enabled: true,
    priority: 1,
    dismiss: "always",
    startsAt: "2026-06-01T00:00:00Z",
    endsAt: "2026-06-30T23:59:59Z",
  },
  {
    id: "maintenance",
    type: "warning",
    message: "Scheduled maintenance tonight 12–2 AM",
    enabled: true,
    priority: 2,
    dismiss: "none",
    endsAt: "2026-07-02T02:00:00Z",
  },
  {
    id: "free-shipping",
    type: "info",
    message: "Free shipping on orders above ₹999",
    enabled: true,
    priority: 3,
    dismiss: "session",
    // no dates → always visible
  },
];
