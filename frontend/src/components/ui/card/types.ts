export type CategoryCardProps = {
  variant: "category";
  link: string;
  imageUrl: string;
  name: string;
};

export type CuratedCardProps = {
  variant: "curated";
  link: string;
  imageUrl: string;
  title: string;
  description?: string;
};

export type ProductCardProps = {
  variant: "product";
  link: string;
  imageUrl: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountLabel?: string;
  onWishlistClick?: () => void;
};

export type CardProps = CategoryCardProps | CuratedCardProps | ProductCardProps;
