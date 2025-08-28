import { Navigate } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "../AuthContext";
import { ADMIN_UID } from "../config";

export default function PrivateRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen grid place-items-center">Загрузка…</div>;
  }

  if (!user || user.uid !== ADMIN_UID) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
