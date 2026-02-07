/* ================================
   Shared Types
================================ */

export type AvailabilityStatus = "AVAILABLE" | "OUT_OF_STOCK" | "PREORDER";

export type DiscountType = "PERCENT" | "FLAT";

/* ================================
   Media
================================ */

export interface ProductImage {
  url: string;
  alt: string;
  isPrimary: boolean;
}

/* ================================
   Pricing
================================ */

export interface ProductDiscount {
  type: DiscountType;
  value: number;
  startAt: string; // ISO date
  endAt: string; // ISO date
}

export interface ProductPricing {
  originalPrice: number;
  salePrice?: number;

  discount?: ProductDiscount | null;
}

/* ================================
   Availability
================================ */

export interface ProductAvailability {
  status: AvailabilityStatus;
  reason?: string;
}

/* ================================
   Specifications
================================ */

export interface ProductSpecItem {
  label: string;
  value: string;
}

/* ================================
   Content Blocks
================================ */

export interface ProductBullets {
  bullets: string[];
}

export interface ProductSpecifications {
  table: ProductSpecItem[];
}

/* ================================
   Variants
================================ */

export interface ProductVariant {
  sku: string;

  attributes: {
    color: string;
    size: string;
  };

  availability: ProductAvailability;
}

/* ================================
   SEO
================================ */

export interface ProductSEO {
  title: string;
  description: string;
}

/* ================================
   Main Product
================================ */

export interface Product {
  /* Core */
  _id: string;
  name: string;

  shortDescription: string;
  longDescription: string;

  categoryId: string;

  tags: string[];

  /* Pricing */
  pricing: ProductPricing;

  /* Availability (Global) */
  availability: ProductAvailability;

  /* Media */
  media: {
    images: ProductImage[];
  };

  /* Variants */
  variants: ProductVariant[];

  /* Content Sections */
  details: ProductBullets;

  sizeAndFit: ProductBullets;

  materialAndCare: ProductBullets;

  specifications: ProductSpecifications;

  /* SEO */
  seo: ProductSEO;

  /* System */
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}
