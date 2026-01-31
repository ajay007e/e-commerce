import type { HeroConfig } from "./config.types";

export const HERO_CONFIG: HeroConfig = {
  enabled: true,
  autoRotateInterval: 6000,
  maxSlides: 3,
  slides: [
    {
      id: "hero-1",
      imageUrl:
        "https://images.unsplash.com/photo-1501947248335-9b511c0cb5c9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Summer fashion collection",
      subText: "New Season",
      headline: "Discover Summer Styles",
      ctaLabel: "Shop Now",
      ctaLink: "/shop",
    },
    {
      id: "hero-2",
      imageUrl:
        "https://images.unsplash.com/photo-1516821440248-f497afaf1b05?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Exclusive menswear",
      subText: "Trending",
      headline: "Upgrade Your Wardrobe",
      ctaLabel: "Explore Collection",
      ctaLink: "/shop/men",
    },
    {
      id: "hero-3",
      imageUrl:
        "https://images.unsplash.com/photo-1607027918684-2445e634caf5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      altText: "Comfortable everyday wear",
      subText: "Comfort First",
      headline: "Everyday Essentials",
      ctaLabel: "Browse Essentials",
      ctaLink: "/shop/essentials",
    },
  ],
  textTransition: {
    subTextDelay: 200,
    headlineDelay: 1600,
    ctaDelay: 3000,
  },
};
