import api from "./axios";
import type { Product } from "./types";

/* =====================================
   Get Products
===================================== */

export const getProducts = async (params?: any) => {
  const res = await api.get<Product[]>("/products", {
    params,
  });

  return res.data;
};

/* =====================================
   Create (Multipart)
===================================== */

export const createProduct = async (data: FormData) => {
  const res = await api.post<Product>("/admin/products", data, {});

  return res.data;
};

/* =====================================
   Update (Multipart)
===================================== */

export const updateProduct = async (id: string, data: FormData) => {
  const res = await api.put<Product>(`/admin/products/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
