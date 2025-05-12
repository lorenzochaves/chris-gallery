"use client"

import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

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
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto flex h-[calc(100vh-8rem)] items-center justify-center px-4">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-gray-500">Entre com suas credenciais para acessar o painel administrativo</p>
          </div>

          {error && <div className="rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Usuário
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Senha
              </label>
              <input
                id="senha"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="input"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminLoginPage
