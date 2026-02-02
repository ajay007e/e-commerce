import api from "@/api/axios";

export const getHeroConfig = async () => {
  const res = await api.get("/api/config/hero");
  return res.data.config;
};

export const saveHeroConfig = (formData: FormData) => {
  return api.put("/api/config/hero", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
