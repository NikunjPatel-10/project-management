import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return <>{!isAuthenticated ? <Navigate to="/login" /> : <Outlet />}</>;
};

export default ProtectedRoute;
