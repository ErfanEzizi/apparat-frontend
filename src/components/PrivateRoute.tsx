import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isTokenExpired } from "../utils/jwt"; // Utility to check token expiration
import { useBreadcrumb } from "../contexts/BreadcrumbContext";

const PrivateRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const token = localStorage.getItem("token");
  const { setBreadcrumb } = useBreadcrumb();
  useEffect(() => {
    if (token && isTokenExpired(token)) {
      setBreadcrumb("Session expired. Please log in again.", "error");
      localStorage.removeItem("token"); // Clear expired token
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Display a loading indicator
  }

  if (!isAuthenticated || (token && isTokenExpired(token))) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
