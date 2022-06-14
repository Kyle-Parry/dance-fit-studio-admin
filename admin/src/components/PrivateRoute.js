import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  return auth && auth.loggedIn;
};

const PrivateRoute = () => {
  const location = useLocation();
  const isAuth = useAuth();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
};

export default PrivateRoute;
