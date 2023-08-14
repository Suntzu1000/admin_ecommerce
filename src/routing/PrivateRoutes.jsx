import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const PrivateRoutes = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const getTokenFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setToken(getTokenFromLocalStorage?.token);
  }, []);

  if (token === undefined) {
    return <Navigate to="/" replace={true} />;
  }

  return children;
};

