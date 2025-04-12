"use client"
import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div className="container mx-auto p-8 text-center">Carregando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  return children
}

export default ProtectedRoute
