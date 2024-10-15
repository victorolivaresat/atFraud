import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LoaderPage from "../utils/LoaderPage";
import { useState, useEffect } from "react";
import "./Routes.css";

const ProtectedRoute = () => {
  const { isAuthenticated, loadingPage } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loadingPage || loading ? (
        <LoaderPage />
      ) : (
        <>{isAuthenticated ? <Outlet /> : <Navigate to="/login" />}</>
      )}
    </>
  );
};

export default ProtectedRoute;
