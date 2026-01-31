import api from "./axios";
import type { ApiResponse, Product } from "@/types";

export const getHomeProducts = () => {
  return api.get<
    ApiResponse<{
      products: Product[];
      user: any | null;
      cartCount: number | null;
    }>
  >("/api/users");
};

export const getAllAdminProducts = () => {
  return api.get<ApiResponse<Product[]>>("/api/admin/products");
};

export const getProductById = (id: string) => {
  return api.get<ApiResponse<Product>>(`/api/admin/products/${id}`);
};

export const addProduct = (data: FormData) => {
  return api.post<ApiResponse<{ productId: string }>>(
    "/api/admin/products",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    },
  );
};

export const updateProduct = (id: string, data: FormData) => {
  return api.put<ApiResponse<null>>(`/api/admin/products/${id}`, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteProduct = (id: string) => {
  return api.delete<ApiResponse<null>>(`/api/admin/products/${id}`);
};
