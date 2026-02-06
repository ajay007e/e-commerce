import api from "@/api/axios";
import type { Category } from "@/pages/admin/categories/types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await api.get("/categories");
  return res.data.categories;
};

export const createCategory = async (data: Partial<Category>) => {
  return api.post("/categories", data);
};

export const updateCategory = async (id: string, data: Partial<Category>) => {
  return api.put(`/categories/${id}`, data);
};
