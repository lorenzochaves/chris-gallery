"use client"

import { createContext, useState, useEffect, useContext } from "react"
import api from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificar se o usuário está autenticado ao carregar a página
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/auth/check")
        setIsAuthenticated(response.data.isAuthenticated)
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (username, password) => {
    try {
      const response = await api.post("/api/auth/login", { username, password })
      setIsAuthenticated(response.data.success)
      return response.data
    } catch (error) {
      console.error("Erro ao fazer login:", error)
      return { success: false, message: "Erro ao fazer login" }
    }
  }

  const logout = async () => {
    try {
      await api.post("/api/auth/logout")
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
