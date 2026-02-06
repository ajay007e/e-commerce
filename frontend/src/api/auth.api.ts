import api from "./axios";
import type { ApiResponse, User, LoginPayload } from "@/types";

export const me = () => {
  return api.get("/auth/me");
};
export const login = (data: LoginPayload) => {
  return api.post<ApiResponse<User>>("/auth/login", data);
};

export const signup = (data: Partial<User>) => {
  return api.post<ApiResponse<User>>("/auth/register", data);
};

export const logout = () => {
  return api.post<ApiResponse<null>>("/auth/logout");
};
