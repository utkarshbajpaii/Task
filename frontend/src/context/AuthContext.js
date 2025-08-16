import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (userData, token) => {
  localStorage.setItem("user", JSON.stringify(userData));
  localStorage.setItem("token", token);
  setUser(userData);
  navigate("/dashboard");   
};


  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      // If only token exists, fetch user from backend
      api.get("/auth/me")
        .then(res => {
          setUser(res.data);
        })
        .catch(() => {
          logout();
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

