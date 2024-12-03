import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { useState, useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { token, decodedToken } = useAuth();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && decodedToken) {
      setLoading(false);
    } else if (!token) {
      setLoading(false); 
    }
  }, [token, decodedToken]);


  if (loading) {
    return <div>Loading...</div>;
  }


  if (!token || decodedToken?.role !== "Admin") {
    const previousPath =
      location.pathname === "/error" ? "/" : location.pathname;

    return <Navigate to="/error" state={{ page: previousPath }} replace />;
  }

  return children;
};

export default PrivateRoute;