import { Navigate, useLocation } from "react-router-dom";
import { getVarSessionStorage } from "./utils/keep";


const PrivateRoute = ({ children }) => {
  const authToken = getVarSessionStorage("accessToken");
  const location = useLocation();

  if (!authToken) {
    const previousPath = location.pathname === "/error" ? "/" : location.pathname;

    return <Navigate to="/error" state={{ page: previousPath }} replace />;
  }

  return children;
};

export default PrivateRoute;