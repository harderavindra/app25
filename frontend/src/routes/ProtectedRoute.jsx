import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <p>Loading...</p>;    

  // Don't redirect again if already on /login
  if (!user && location.pathname !== "/login") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet/>;
};

export default ProtectedRoute;
