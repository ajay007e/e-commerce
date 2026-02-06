import api from "@/api/axios";
import type { Size } from "@/pages/admin/sizes/types";

export const getSizes = async (): Promise<Size[]> => {
  const res = await api.get("/sizes");
  return res.data.sizes;
};

export const createSize = async (data: Partial<Size>) => {
  return api.post("/sizes", data);
};

export const updateSize = async (id: string, data: Partial<Size>) => {
  return api.put(`/sizes/${id}`, data);
};
