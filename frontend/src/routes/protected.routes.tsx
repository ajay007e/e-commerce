import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/context/auth.context";
import type { RouteGuardProps } from "./routes.types";

export default function ProtectedRoute({ children }: RouteGuardProps) {
  const { user, loading } = useAuth();

  // ⏳ Still checking session
  if (loading) {
    return null; // spinner later
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Logged in
  return <>{children}</>;
}
