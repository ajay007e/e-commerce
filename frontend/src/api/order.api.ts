import api from "./axios";
import type { ApiResponse, Order, PlaceOrderPayload } from "@/types";

export const placeOrder = (data: PlaceOrderPayload) => {
  return api.post<ApiResponse<any>>("/api/users/order", data);
};

export const getOrders = () => {
  return api.get<ApiResponse<Order[]>>("/api/users/orders");
};

export const getOrderById = (id: string) => {
  return api.get<ApiResponse<Order>>(`/api/users/orders/${id}`);
};

export const verifyPayment = (data: any) => {
  return api.post<ApiResponse<null>>("/api/users/verify-payment", data);
};
