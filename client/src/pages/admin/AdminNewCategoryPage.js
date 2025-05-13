"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/api"
import "../../styles/admin.css"

const AdminNewCategoryPage = () => {
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await api.post("/api/categories", { name, slug })
      navigate("/admin/categories")
    } catch (error) {
      console.error("Erro ao criar categoria:", error)
      setError("Erro ao criar categoria. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Nova Categoria</h1>
          <Link to="/admin/categories" className="admin-button admin-button-secondary">
            Voltar
          </Link>
        </div>

        <div className="admin-card">
          <div className="admin-card-body">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}

            <form onSubmit={handleSubmit} className="admin-form">
              <div className="admin-form-group">
                <label htmlFor="name" className="admin-label">
                  Nome da Categoria
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="slug" className="admin-label">
                  Slug (opcional)
                </label>
                <input
                  id="slug"
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="admin-input"
                  placeholder="categoria-exemplo"
                />
                <p className="text-xs text-gray-500 mt-1">
                  O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <Link to="/admin/categories" className="admin-button admin-button-secondary">
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="admin-button admin-button-primary"
                  disabled={isLoading}
                >
                  {isLoading ? "Criando..." : "Criar Categoria"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNewCategoryPage
