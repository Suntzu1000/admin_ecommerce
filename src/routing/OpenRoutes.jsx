import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocaStorage = JSON.parse(localStorage.getItem("user"));
  console.log(getTokenFromLocaStorage?.token);
  return getTokenFromLocaStorage?.token === undefined ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};
