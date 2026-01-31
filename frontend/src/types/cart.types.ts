import type { Product } from "./product.types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartResponse {
  cartProducts: CartItem[];
  total: number;
}

export interface ChangeCartQuantityPayload {
  cartId: string;
  productId: string;
  count: number;
}
