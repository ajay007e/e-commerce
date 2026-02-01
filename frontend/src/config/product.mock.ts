import type { SearchProductItem } from "@/config/business.types";

export const MOCK_PRODUCT_DETAILS = {
  id: "p1",
  title: "Men's Running Shoes",
  description: "Lightweight running shoes designed for daily training.",
  images: [
    {
      id: "i1",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      alt: "Running shoes front view",
    },
    {
      id: "i2",
      url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      alt: "Side profile",
    },
    {
      id: "i3",
      url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      alt: "Top view",
    },
    {
      id: "i1",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      alt: "Running shoes front view",
    },
    {
      id: "i2",
      url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      alt: "Side profile",
    },
    {
      id: "i3",
      url: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      alt: "Top view",
    },
  ],

  rating: {
    average: 4.4,
    count: 312,
    distribution: {
      5: 180,
      4: 90,
      3: 30,
      2: 8,
      1: 4,
    },
  },

  price: 2999,
  originalPrice: 3999,
  discountRate: 25,

  variants: [
    { id: "black", label: "Black", value: "#000000" },
    { id: "blue", label: "Blue", value: "#2563eb" },
  ],

  sizes: [
    { id: "7", label: "7" },
    { id: "8", label: "8" },
    { id: "9", label: "9" },
    { id: "10", label: "10", disabled: true },
  ],

  deliveryInfo: [
    { id: "d1", text: "Delivery in 3–5 business days" },
    { id: "d2", text: "Free returns within 7 days" },
  ],

  offers: [
    { id: "o1", text: "10% off with XYZ Bank cards" },
    { id: "o2", text: "Flat ₹300 off on prepaid orders" },
  ],

  details: {
    paragraphs: [
      "Designed for runners who need lightweight comfort and durability.",
    ],
    bullets: ["Breathable mesh upper", "High-traction rubber sole"],
  },

  sizeAndFit: {
    bullets: ["Regular fit", "True to size"],
  },

  materialAndCare: {
    bullets: ["Upper: Mesh", "Sole: Rubber", "Wipe clean with dry cloth"],
  },

  specifications: {
    table: [
      { label: "SKU", value: "RUN-SHOE-123" },
      { label: "Country of Origin", value: "India" },
    ],
  },

  reviews: [
    {
      id: "r1",
      rating: 5,
      text: "Very comfortable and lightweight. Perfect for daily runs.",
      authorName: "Amit",
      date: "Mar 2025",
    },
    {
      id: "r2",
      rating: 4,
      text: "Good cushioning but runs slightly small.",
      authorName: "Sneha",
      date: "Feb 2025",
    },
  ],

  similarProducts: [
    {
      id: "sim-1",
      name: "Lightweight Running Shoes",
      imageUrl: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
      price: 2799,
      originalPrice: 3499,
      discountRate: 20,
      rating: { value: 4.3, count: 98 },
      imageTags: [{ label: "Featured" }],
      isAvailable: true,
      sellingInfo: {
        icon: "fire",
        text: "Popular in this category",
      },
    },
    {
      id: "sim-2",
      name: "Breathable Sports Sneakers",
      imageUrl: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      price: 2399,
      originalPrice: 2999,
      discountRate: 20,
      rating: { value: 4.1, count: 64 },
      imageTags: [{ label: "New" }],
      isAvailable: true,
    },
    {
      id: "sim-3",
      name: "Everyday Training Shoes",
      imageUrl: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
      price: 1999,
      rating: { value: 3.9, count: 41 },
      isAvailable: true,
    },
    {
      id: "sim-4",
      name: "High Grip Performance Shoes",
      imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      price: 3299,
      originalPrice: 3999,
      discountRate: 18,
      rating: { value: 4.6, count: 143 },
      imageTags: [{ label: "Limited", variant: "secondary" }],
      isAvailable: true,
      sellingInfo: {
        icon: "users",
        text: "Top choice among runners",
      },
    },
    {
      id: "sim-4",
      name: "High Grip Performance Shoes",
      imageUrl: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
      price: 3299,
      originalPrice: 3999,
      discountRate: 18,
      rating: { value: 4.6, count: 143 },
      imageTags: [{ label: "Limited", variant: "secondary" }],
      isAvailable: true,
      sellingInfo: {
        icon: "users",
        text: "Top choice among runners",
      },
    },
  ] as SearchProductItem[],
  customersAlsoLike: [
    {
      id: "like-1",
      name: "Minimalist White Sneakers",
      imageUrl: "https://images.unsplash.com/photo-1528701800489-20be3c8c86b4",
      price: 2199,
      rating: { value: 4.2, count: 76 },
      imageTags: [{ label: "New" }],
      isAvailable: true,
    },
    {
      id: "like-2",
      name: "Premium Leather Casual Shoes",
      imageUrl: "https://images.unsplash.com/photo-1605733160314-4fc7dac4bb16",
      price: 4599,
      originalPrice: 5599,
      discountRate: 18,
      rating: { value: 4.7, count: 152 },
      imageTags: [{ label: "Featured" }],
      isAvailable: true,
      sellingInfo: {
        icon: "fire",
        text: "Bestseller this month",
      },
    },
    {
      id: "like-3",
      name: "Slip-On Comfort Shoes",
      imageUrl: "https://images.unsplash.com/photo-1605405740214-7f3b7e6fbbd5",
      price: 1899,
      rating: { value: 3.8, count: 39 },
      isAvailable: true,
    },
    {
      id: "like-4",
      name: "Urban Street Sneakers",
      imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      price: 2999,
      originalPrice: 3699,
      discountRate: 19,
      rating: { value: 4.4, count: 112 },
      imageTags: [{ label: "Trending" }],
      isAvailable: true,
      sellingInfo: {
        icon: "users",
        text: "Frequently bought together",
      },
    },
  ] as SearchProductItem[],
};
