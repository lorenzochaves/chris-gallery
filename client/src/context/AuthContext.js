"use client"

import { createContext, useState, useEffect, useContext } from "react"
import api from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a página
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setUser(null);
          return;
        }

        const response = await api.get("/api/auth/check");
        setIsAuthenticated(response.data.isAuthenticated);
        setUser(response.data.usuario);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('token');
      } finally {
        setIsLoading(false);
      }
    }

    checkAuth();
  }, []);

  const login = async (email, senha) => {
    try {
      const response = await api.post("/api/auth/login", { email, senha });
      const { token, usuario } = response.data;
      
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
      setUser(usuario);
      
      return { success: true, usuario };
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return { 
        success: false, 
        message: error.response?.data?.erro || "Erro ao fazer login" 
      };
    }
  };
  
  const logout = async () => {
    try {
      await api.post("/api/auth/logout");
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
