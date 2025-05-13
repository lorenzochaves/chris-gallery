"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import "../../styles/admin.css"

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");  
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // Redirecionar se já estiver autenticado
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin/dashboard")
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(email, senha);

      if (result.success) {
        navigate("/admin/dashboard")
      } else {
        setError(result.message || "Credenciais inválidas")
      }
    } catch (error) {
      setError("Erro ao fazer login. Tente novamente.")
      console.error("Erro de login:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Admin Login</h1>
          <p className="text-gray-500">Entre com suas credenciais para acessar o painel administrativo</p>
        </div>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <div className="admin-card">
          <div className="admin-card-body">
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label className="admin-label">Usuário</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Senha</label>
                <input
                  id="senha"
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <button type="submit" className="admin-button admin-button-primary w-full" disabled={isLoading}>
                {isLoading ? "Entrando..." : "Entrar"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
