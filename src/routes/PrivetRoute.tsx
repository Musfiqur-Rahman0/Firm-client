import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import type { ReactNode } from "react";
import React from "react";

type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER";

interface PrivateRouteProps {
  children: ReactNode;
  requiredRole?: UserRole[];
  userRole?: UserRole;
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  requiredRole,
  userRole,
  redirectTo = "/auth/login",
}: PrivateRouteProps) => {
  const { user, loading } = React.useContext(AuthContext); //  Get auth state (user, loading) from context

  console.log("PrivateRoute - user:", user, "loading:", loading);
  if (loading) {
    return <div>Loading...</div>; //  Show loading state while auth is being checked
  }
  //  Check if user is authenticated

  // Not logged in
  if (!loading && !user) {
    return <Navigate to={redirectTo} replace />;
  }
  console.log("User role:", user?.role, "Required role:", requiredRole);
  // Role check
  if (requiredRole && !requiredRole.includes(user?.role || "CUSTOMER")) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
