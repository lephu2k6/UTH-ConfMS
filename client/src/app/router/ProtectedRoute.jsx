import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../app/store/useAuthStore";

export default function ProtectedRoute({ children, allowRoles }) {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (allowRoles) {
    const normalize = (r) => String(r || "").toLowerCase().replace(/s$/,'');
    const allowed = allowRoles.map(normalize);
    const userRole = normalize(role);

    if (!allowed.includes(userRole)) {
      return <Navigate to="/unauthorized" />;
    }
  }

  return children;
}