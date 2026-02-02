import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/auth.context";

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) {
    return <Navigate to={user.isAdmin ? "/admin" : "/app"} replace />;
  }

  return children;
}
