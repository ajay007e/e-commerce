import axios from "axios";
import { API_BASE_URL } from "./config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // important for session-based auth
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
