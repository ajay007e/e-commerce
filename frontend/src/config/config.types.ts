export interface NavChildLink {
  label: string;
  path: string;
}

export interface NavLink {
  label: string;
  path?: string;
  children?: NavChildLink[];
}

export interface NavbarIconConfig {
  key: "cart" | "wishlist" | "search";
  label: string;
  path?: string;
  Icon: React.ComponentType<{ className?: string }>;
  enabled: boolean;
}

export interface UserMenuItem {
  label: string;
  path?: string;
  action?: "logout";
}

export type FooterVariant = "long" | "minimal";

export interface FooterLink {
  label: string;
  path: string;
}

export interface LongFooterSections {
  title: string;
  links: FooterLink[];
}

export type BannerType = "info" | "success" | "warning" | "error";

export type BannerMode = "single" | "stack" | "carousel";

export type BannerDismissMode = "none" | "session" | "always";

export interface TopBannerItem {
  id: string;
  type: BannerType;
  dismiss: BannerDismissMode;
  message: string;
  enabled: boolean;
  priority: number;
}

export interface TopBannerConfig {
  enabled: boolean;
  mode: BannerMode;
  source: "static" | "future-api";
  stackLimit?: number; // stack mode only
  rotateInterval?: number; // ms (carousel only)

  startsAt?: string; // ISO string
  endsAt?: string; // ISO string
}

export interface HeroSlide {
  id: string;
  imageUrl: string;
  altText: string;
  subText: string;
  headline: string;
  ctaLabel: string;
  ctaLink: string;
}

export interface HeroTextTransitionConfig {
  subTextDelay?: number;
  headlineDelay?: number;
  ctaDelay?: number;
}

export interface HeroConfig {
  enabled: boolean;
  autoRotateInterval?: number;
  maxSlides?: number;
  slides: HeroSlide[];
  textTransition?: HeroTextTransitionConfig;
}

export interface ShowcaseBlockBase {
  id: string;
  title: string;
  subtitle?: string;
  type: "category" | "curated" | "product";
  enabled: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  /**
   * Square image (1:1)
   */
  imageUrl: string;
  link: string;
}

export interface CategoryShowcaseBlock extends ShowcaseBlockBase {
  type: "category";
  items: CategoryItem[];
  maxItems?: number;
  autoScrollInterval?: number;
}

export interface CuratedTypeItem {
  id: string;
  title: string;
  description?: string;

  /**
   * Rectangle image (4:3)
   */
  imageUrl: string;
  link: string;
}

export interface CuratedShowcaseBlock extends ShowcaseBlockBase {
  type: "curated";
  items: CuratedTypeItem[];
  maxItems?: number;
}

export interface ProductShowcaseItem {
  id: string;
  name: string;
  /**
   * Square product image
   */
  imageUrl: string;
  originalPrice?: number;
  price: number;
  discountLabel?: string;
  link: string;
}

export interface ProductShowcaseBlock extends ShowcaseBlockBase {
  type: "product";
  items: ProductShowcaseItem[];
  categories?: string[];
  maxItems?: number;
}

export type ShowcaseBlock =
  | CategoryShowcaseBlock
  | CuratedShowcaseBlock
  | ProductShowcaseBlock;

export interface WhyChooseUsItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  enabled: boolean;
}

export interface WhyChooseUsConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  items: WhyChooseUsItem[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  quote: string;
  avatarUrl?: string;
  enabled: boolean;
}

export interface TestimonialConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  items: TestimonialItem[];
  autoPlay?: boolean;
  autoPlayDelay?: number;
}

export interface ContactInfoItem {
  id: string;
  type: "email" | "phone" | "response_time";
  label: string;
  value: string;
  enabled: boolean;
}

export interface ContactUsConfig {
  enabled: boolean;
  title: string;
  subtitle?: string;
  contactInfo: ContactInfoItem[];
  formEnabled: boolean;
}
