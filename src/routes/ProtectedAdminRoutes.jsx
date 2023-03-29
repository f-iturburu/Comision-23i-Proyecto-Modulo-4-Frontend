import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user-token")) || null;
  const ADMIN_LOGIN_KEY = import.meta.env.VITE_ADMIN_LOGIN_KEY;
  if (token.role !== ADMIN_LOGIN_KEY) {
    return <Navigate to={"/"}></Navigate>;
  } else {
    return children;
  }
};

export default ProtectedAdminRoute;