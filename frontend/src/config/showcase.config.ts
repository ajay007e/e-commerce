import type { ShowcaseBlock } from "./config.types";

export const SHOWCASE_CONFIG: ShowcaseBlock[] = [
  {
    id: "categories",
    type: "category",
    enabled: true,
    title: "Shop by Category",
    subtitle: "Browse collections curated for you",
    maxItems: 8,
    items: [
      {
        id: "men",
        name: "Men",
        imageUrl:
          "https://plus.unsplash.com/premium_photo-1669349127520-fa1e30b02055?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=men",
      },
      {
        id: "women",
        name: "Women",
        imageUrl:
          "https://images.unsplash.com/photo-1594476664296-8c552053aef3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=women",
      },
      {
        id: "kids",
        name: "Kids",
        imageUrl:
          "https://images.unsplash.com/photo-1604922824961-87cefb2e4b07?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=kids",
      },
      {
        id: "accessories",
        name: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1602015103066-f45732e2aa84?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=accessories",
      },
      {
        id: "footwear",
        name: "Footwear",
        imageUrl:
          "https://images.unsplash.com/photo-1553181001-f9cf6c45afca?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=footwear",
      },
      {
        id: "ethnic",
        name: "Ethnic Wear",
        imageUrl:
          "https://images.unsplash.com/photo-1549021179-127b81585b60?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        link: "/shop?category=ethnic",
      },
    ],
  },

  {
    id: "curated-types",
    type: "curated",
    enabled: true,
    title: "Discover More",
    subtitle: "Hand-picked selections you’ll love",
    maxItems: 6,
    items: [
      {
        id: "best-sellers",
        title: "Best Sellers",
        description: "Most loved by our customers",
        imageUrl: "/images/curated/best-sellers.jpg",
        link: "/shop?tag=best-sellers",
      },
      {
        id: "new-arrivals",
        title: "New Arrivals",
        description: "Fresh styles just dropped",
        imageUrl: "/images/curated/new-arrivals.jpg",
        link: "/shop?tag=new-arrivals",
      },
      {
        id: "under-999",
        title: "Under ₹999",
        description: "Stylish picks within budget",
        imageUrl: "/images/curated/under-999.jpg",
        link: "/shop?price=under-999",
      },
      {
        id: "summer-picks",
        title: "Summer Picks",
        description: "Light & breezy essentials",
        imageUrl: "/images/curated/summer.jpg",
        link: "/shop?tag=summer",
      },
    ],
  },

  {
    id: "featured-products",
    type: "product",
    enabled: true,
    title: "Featured Products",
    subtitle: "Top picks from multiple categories",
    maxItems: 8,
    categories: ["men", "women", "accessories"],
    items: [
      {
        id: "prod-1",
        name: "Men Slim Fit Shirt",
        imageUrl: "/images/products/shirt-1.jpg",
        originalPrice: 1499,
        price: 999,
        discountLabel: "33% OFF",
        link: "/product/prod-1",
      },
      {
        id: "prod-2",
        name: "Women Floral Dress",
        imageUrl: "/images/products/dress-1.jpg",
        originalPrice: 1999,
        price: 1299,
        discountLabel: "35% OFF",
        link: "/product/prod-2",
      },
      {
        id: "prod-3",
        name: "Casual Sneakers",
        imageUrl: "/images/products/sneakers-1.jpg",
        originalPrice: 2499,
        price: 1799,
        discountLabel: "28% OFF",
        link: "/product/prod-3",
      },
      {
        id: "prod-4",
        name: "Leather Handbag",
        imageUrl: "/images/products/handbag-1.jpg",
        originalPrice: 2999,
        price: 2199,
        discountLabel: "27% OFF",
        link: "/product/prod-4",
      },
      {
        id: "prod-5",
        name: "Men Denim Jacket",
        imageUrl: "/images/products/jacket-1.jpg",
        originalPrice: 3499,
        price: 2499,
        discountLabel: "29% OFF",
        link: "/product/prod-5",
      },
    ],
  },
];
