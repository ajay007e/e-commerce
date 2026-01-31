import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/auth.context";
import type { RouteGuardProps } from "./routes.types";

export default function PublicRoute({ children }: RouteGuardProps) {
  const { user, loading } = useAuth();

  // ⏳ Still checking session
  if (loading) {
    return null; // spinner later
  }

  // ❌ Already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  // ✅ Guest user
  return <>{children}</>;
}
