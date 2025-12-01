import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  
  // Check authentication from localStorage FIRST (source of truth)
  // This ensures we catch logout immediately even before Zustand updates
  const checkAuth = () => {
    try {
      const authData = localStorage.getItem('auth');
      if (!authData) return false;
      
      const parsed = JSON.parse(authData);
      return !!(parsed && parsed.accessToken && parsed.user);
    } catch (e) {
      return false;
    }
  };
  
  const isAuthenticated = checkAuth();

  if (!isAuthenticated) {
    // Lưu location hiện tại để redirect về sau khi login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

