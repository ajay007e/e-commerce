import type {
  FooterVariant,
  LongFooterSections,
  FooterLink,
} from "./config.types";

export const FOOTER_VARIANT: FooterVariant = "long";

export const LONG_FOOTER_SECTIONS: LongFooterSections[] = [
  {
    title: "Shop",
    links: [
      { label: "Men", path: "/shop/men" },
      { label: "Women", path: "/shop/women" },
      { label: "Kids", path: "/shop/kids" },
      { label: "Accessories", path: "/shop/accessories" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Shipping Policy", path: "/refund" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Refund and Return Policy", path: "/shipping" },
    ],
  },
];

export const MINIMAL_FOOTER_LINKS: FooterLink[] = [
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
  { label: "Support", path: "/support" },
];
