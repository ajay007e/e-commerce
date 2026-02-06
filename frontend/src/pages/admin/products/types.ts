export interface ProductSizePrice {
  sizeId: string;
  sizeName: string;
  price: number;
  comparePrice?: number;
  stock: number;
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  categoryId: string;
  price: number;
  comparePrice?: number;
  sizes: ProductSizePrice[];
  images: string[];
  createdAt: string;
}
