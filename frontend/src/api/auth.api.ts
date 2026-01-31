import api from "./axios";
import type { ApiResponse, User, LoginPayload } from "@/types";

export const login = (data: LoginPayload) => {
  return api.post<ApiResponse<User>>("/api/users/login", data);
};

export const signup = (data: Partial<User>) => {
  return api.post<ApiResponse<User>>("/api/users/signup", data);
};

export const logout = () => {
  return api.post<ApiResponse<null>>("/api/users/logout");
};
