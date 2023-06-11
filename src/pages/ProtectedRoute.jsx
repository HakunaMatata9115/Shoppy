import React from "react";
import { useAuthContext } from "../components/context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useAuthContext();
  if (!user || !user.requireAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}
