import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) return null; // or a loading spinner

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

