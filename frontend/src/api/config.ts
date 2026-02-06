const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_VERSION = import.meta.env.VITE_API_VERSION || "v1";

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL is not defined");
}

export { API_BASE_URL, API_VERSION };
