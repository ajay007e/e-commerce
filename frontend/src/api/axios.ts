import axios from "axios";
import { API_BASE_URL, API_VERSION } from "./config";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/${API_VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔮 Future-ready: interceptors (JWT, global errors)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Example: handle unauthorized globally later
    if (error.response?.status === 401) {
      // placeholder — no redirect yet
      // window.location.href = "/login";
      console.warn("Unauthorized");
    }
    return Promise.reject(error);
  },
);

export default api;
