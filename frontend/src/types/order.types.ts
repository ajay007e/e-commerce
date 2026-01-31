import type { Product } from "./product.types";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: "placed" | "paid" | "shipped" | "cancelled";
  createdAt: string;
}

export interface PlaceOrderPayload {
  userId: string;
  address: string;
  mode: "cod" | "online";
}
