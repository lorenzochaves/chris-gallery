"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import api from "../../utils/api"
import { FaUserEdit } from "react-icons/fa"
import "../../styles/admin.css"

const AdminDashboardPage = () => {
  const [artworks, setArtworks] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { logout } = useAuth()

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await api.get("/api/artworks")
        setArtworks(response.data)
      } catch (error) {
        console.error("Erro ao carregar obras:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchArtworks()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta obra?")) {
      try {
        await api.delete(`/api/artworks/${id}`)
        setArtworks(artworks.filter((artwork) => artwork.id !== id))
      } catch (error) {
        console.error("Erro ao excluir obra:", error)
      }
    }
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin-header">
          <h1 className="admin-title">Painel Administrativo</h1>
          <div className="admin-actions">
            <button onClick={handleLogout} className="admin-button admin-button-secondary">
              Sair
            </button>
            <Link to="/admin/categories" className="admin-button admin-button-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M9 5H2v7l6.29 6.29c.94.94 2.48.94 3.42 0l3.58-3.58c.94-.94.94-2.48 0-3.42L9 5Z" />
                <path d="M6 9.01V9" />
                <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
              </svg>
              Categorias
            </Link>
            <Link to="/admin/artworks/new" className="admin-button admin-button-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Nova Obra
            </Link>
            <Link to="/admin/profile" className="admin-button admin-button-secondary">
              <FaUserEdit className="mr-2" /> Editar Perfil
            </Link>
            <Link to="/admin/carrossel" className="admin-button admin-button-secondary">
              Customizar Carrossel
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="admin-loading">
            <div className="admin-loading-spinner" />
          </div>
        ) : (
          <div className="admin-grid">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="admin-card">
                <div className="admin-image-preview">
                  <img
                    src={artwork.image || "/placeholder.svg"}
                    alt={artwork.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="admin-image-actions">
                    <Link
                      to={`/admin/artworks/edit/${artwork.id}`}
                      className="admin-image-action-button"
                      title="Editar"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      </svg>
                    </Link>
                    <button
                      onClick={() => handleDelete(artwork.id)}
                      className="admin-image-action-button ml-2"
                      title="Excluir"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="admin-card-body">
                  <h3 className="font-medium admin-truncate">{artwork.title}</h3>
                  <p className="text-sm text-gray-500">
                    {artwork.available ? "Disponível" : "Indisponível"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && artworks.length === 0 && (
          <div className="admin-alert admin-alert-info">
            Nenhuma obra cadastrada. Clique em "Nova Obra" para adicionar.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboardPage
