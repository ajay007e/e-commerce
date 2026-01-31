import type { TestimonialConfig } from "./config.types";

export const TESTIMONIAL_CONFIG: TestimonialConfig = {
  enabled: true,

  title: "What Our Customers Say",
  subtitle: "Real feedback from people who love shopping with us",

  autoPlay: true,
  autoPlayDelay: 5000,

  items: [
    {
      id: "t1",
      name: "Aarav Sharma",
      quote:
        "Great quality products and fast delivery. The shopping experience was smooth and hassle-free.",
      avatarUrl: "/images/testimonials/aarav.jpg",
      enabled: true,
    },
    {
      id: "t2",
      name: "Priya Nair",
      quote:
        "Loved the collection and the prices. Customer support was very responsive as well.",
      avatarUrl: "/images/testimonials/priya.jpg",
      enabled: true,
    },
    {
      id: "t3",
      name: "Rohan Verma",
      quote:
        "The products matched exactly what was shown. I’ll definitely shop again!",
      avatarUrl: "/images/testimonials/rohan.jpg",
      enabled: true,
    },
  ],
};
