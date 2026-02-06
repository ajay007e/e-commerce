import api from "./axios";
import type { Product } from "./types";

export const getProducts = async (params: any) => {
  const res = await api.get("/api/admin/products", { params });
  return res.data;
};

export const createProduct = async (data: Partial<Product>) => {
  return api.post("/api/admin/products", data);
};

export const updateProduct = async (id: string, data: Partial<Product>) => {
  return api.put(`/api/admin/products/${id}`, data);
};
