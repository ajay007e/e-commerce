import type { WhyChooseUsConfig } from "./config.types";

export const WHY_CHOOSE_US_CONFIG: WhyChooseUsConfig = {
  enabled: true,

  title: "Why Choose Us",
  subtitle: "We focus on quality, reliability, and your satisfaction",

  items: [
    {
      id: "quality",
      icon: "quality",
      title: "Quality Assurance",
      description: "Every product goes through strict quality checks",
      enabled: true,
    },
    {
      id: "delivery",
      icon: "delivery",
      title: "Fast & Reliable Delivery",
      description: "On-time delivery with real-time tracking",
      enabled: true,
    },
    {
      id: "secure-payments",
      icon: "secure",
      title: "Secure Payments",
      description: "Trusted and encrypted payment gateways",
      enabled: true,
    },
    {
      id: "returns",
      icon: "returns",
      title: "Easy Returns",
      description: "Hassle-free returns with clear policies",
      enabled: true,
    },
  ],
};
