import api from "./axios";
import type {
  ApiResponse,
  CartResponse,
  ChangeCartQuantityPayload,
} from "@/types";

export const getCart = () => {
  return api.get<ApiResponse<CartResponse>>("/api/users/cart");
};

export const addToCart = (productId: string) => {
  return api.post<ApiResponse<null>>(`/api/users/cart/${productId}`);
};

export const changeCartQuantity = (data: ChangeCartQuantityPayload) => {
  return api.patch<ApiResponse<CartResponse>>("/api/users/cart", data);
};

export const deleteCartItem = (data: { cartId: string; productId: string }) => {
  return api.delete<ApiResponse<null>>("/api/users/cart", { data });
};
