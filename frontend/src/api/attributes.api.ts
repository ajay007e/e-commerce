import api from "@/api/axios";

export interface Attribute {
  _id: string;
  name: string;
  slug: string;
  type: "select" | "text" | "number";
}

export interface AttributeValue {
  _id: string;
  attributeId: string;
  value: string;
}

/* ================= ATTRIBUTES ================= */

/* Get all attributes */
export const getAttributes = async (): Promise<Attribute[]> => {
  const res = await api.get("/attributes");
  return res.data.attributes;
};

/* Create */
export const createAttribute = async (data: Partial<Attribute>) => {
  return api.post("/admin/attributes", data);
};

/* Update */
export const updateAttribute = async (id: string, data: Partial<Attribute>) => {
  return api.put(`/admin/attributes/${id}`, data);
};

/* ================= VALUES ================= */

/* Get values */
export const getAttributeValues = async (
  attributeId: string,
): Promise<AttributeValue[]> => {
  const res = await api.get(`/attributes/${attributeId}/values`);
  return res.data.values;
};

/* Get values by slug */
export const getAttributeValuesBySlug = async (
  slug: string,
): Promise<AttributeValue[]> => {
  const res = await api.get(`/attributes/slug/${slug}/values`);
  return res.data.values;
};

/* Create value */
export const createAttributeValue = async (data: {
  attributeId: string;
  value: string;
}) => {
  return api.post("/admin/attributes/values", data);
};

/* Update value */
export const updateAttributeValue = async (
  id: string,
  data: { value: string },
) => {
  return api.put(`/admin/attributes/values/${id}`, data);
};
