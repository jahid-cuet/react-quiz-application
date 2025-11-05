import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PublicRoute({ children }) {
  const { currentUser } = useAuth();

  // If user is logged in, redirect to home
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  // If not logged in, render the public page (login/signup)
  return children;
}
