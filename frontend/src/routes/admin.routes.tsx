
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

export default function AdminRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/app" replace />;
  }

  return children;
}
