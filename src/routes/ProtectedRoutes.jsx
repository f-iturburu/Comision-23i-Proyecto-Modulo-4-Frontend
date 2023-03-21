import { Navigate, Outlet } from "react-router-dom";
// cambiar cuando se obtenga el token

/*const ProtectedRoute = ({ children }) => {
  const token = JSON.parse(localStorage.getItem("user-token")) || null;

  if (!token) {
    return <Navigate to={"/login"}></Navigate>;
  } else {
    return children;
  }
}; */


const ProtectedRoute = ({
  isAllowed,
  redirectTo = "/login",
  children,
}) => {
  if (!isAllowed) {
    return <Navigate to={redirectTo} replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;