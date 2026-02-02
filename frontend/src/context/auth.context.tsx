import { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextValue } from "./context.types";
import type { User } from "@/types";
import * as authApi from "@/api/auth.api";
import * as productApi from "@/api/product.api";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const res = await authApi.me();
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    const res = await authApi.login({ email, password });
    const { user } = res.data;
    setUser(user);

    if (user.isAdmin) {
      navigate("/admin");
    } else {
      navigate("/app");
    }
  };

  const signup = async (data: Partial<User>): Promise<void> => {
    const res = await authApi.signup(data);
    const { user } = res.data;
    console.log(user);
    setUser(user);
  };

  const logout = async (): Promise<void> => {
    await authApi.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
