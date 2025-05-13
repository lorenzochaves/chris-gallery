"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../utils/api"
import "../../styles/admin.css"

const AdminEditCategoryPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [imagensAdicionais, setImagensAdicionais] = useState([])

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await api.get(`/api/categories/${id}`)
        const category = response.data
        setName(category.name)
        setSlug(category.slug)
      } catch (error) {
        console.error("Erro ao carregar categoria:", error)
        setError("Erro ao carregar categoria. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategory()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      await api.put(`/api/categories/${id}`, { name, slug })
      navigate("/admin/categories")
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error)
      setError("Erro ao atualizar categoria. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="admin-container">
        <div className="admin-content">
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Editar Categoria</h1>
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
                />
                <p className="text-xs text-gray-500 mt-1">
                  O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
                </p>
              </div>

              <div className="admin-form-group">
                <label htmlFor="imagensAdicionais" className="admin-label">
                  Imagens Adicionais
                </label>
                <input
                  id="imagensAdicionais"
                  type="file"
                  accept="image/*,video/mp4"
                  multiple
                  onChange={(e) => setImagensAdicionais([...e.target.files])}
                  className="admin-input"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Link to="/admin/categories" className="admin-button admin-button-secondary">
                  Cancelar
                </Link>
                <button
                  type="submit"
                  className="admin-button admin-button-primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Salvando..." : "Atualizar Categoria"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEditCategoryPage
