// contexts/AuthContextPF.jsx
import { createContext, useState, useContext, useEffect } from "react";
import * as authAPI from "../api/authAPI";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import cookie from "js-cookie";

export const AuthContextPF = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const authenticateUser = (user) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const loginUser = async (email, password) => {
    try {
      
      const data = await authAPI.loginPF(email, password);
      if (data) {
        authenticateUser(data);
        toast.success("¡Bienvenido!");
      }
    } catch (error) {
      console.log("HOLA")
      toast.error("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
      console.error("Error during login", error);
    }
  };

  const logoutUser = async () => {
    try {
      await authAPI.logoutPF();
      cookie.remove("token");
      setCurrentUser(null);
      setIsAuthenticated(false);
      toast.success("¡Hasta pronto!");
    } catch (error) {
      console.error("Error al cerrar sesión: ", error);
      toast.error("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
    }
  };
/*
  const updateThemeUser = async (theme) => {
    if (!currentUser || !currentUser.userId) return;
    try {
      await authAPI.updateTheme(currentUser.userId, theme); // Asegúrate de que esta función existe
      window.localStorage.setItem("theme", theme);
    } catch (error) {
      console.error(`Error al actualizar el tema: ${error.message}`);
      toast.error("Error al actualizar el tema");
    }
  };*/

  useEffect(() => {
    async function checkLoginStatus() {
      const cookies = cookie.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setCurrentUser(null);
      }

      try {
        const res = await authAPI.verifyTokenPF(cookies.token);
        if (!res.success) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setCurrentUser(res);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setIsAuthenticated(false);
        setCurrentUser(null);
        setLoading(false);
      }
    }

    checkLoginStatus();
  }, []);

  const value = {
    currentUser,
    setCurrentUser: authenticateUser,
    loginUser,
    logoutUser,
    isAuthenticated,
    loading,
    //updateThemeUser, // Asegúrate de que se incluya en el valor del contexto
  };

  return <AuthContextPF.Provider value={value}>{children}</AuthContextPF.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContextPF);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
