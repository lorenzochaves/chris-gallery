"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/api"
import "../../styles/admin.css"

const AdminNewArtworkPage = () => {
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [available, setAvailable] = useState(true)
  const [dimensions, setDimensions] = useState("")
  const [technique, setTechnique] = useState("")
  const artista = 'Chris Fontenelle'; 
  const [imagemPrincipal, setImagemPrincipal] = useState(null)
  const [imagensAdicionais, setImagensAdicionais] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/api/categories")
        setCategories(response.data)
      } catch (error) {
        console.error("Erro ao carregar categorias:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  const handleCategoryChange = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("price", price)
    formData.append("available", available)
    formData.append("dimensions", dimensions)
    formData.append("technique", technique)
    formData.append("artista", artista)
    formData.append("usuario_id", 1) // fixo por enquanto

    if (imagemPrincipal) {
      formData.append("imagem_principal", imagemPrincipal)
    }

    imagensAdicionais.forEach(file => formData.append("imagens_adicionais", file))

    selectedCategories.forEach((id) => {
      formData.append("categoryIds", id)
    })

    try {
      await api.post("/api/artworks", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      navigate("/admin/dashboard")
    } catch (error) {
      console.error("Erro ao criar obra:", error)
      setError("Erro ao criar obra. Tente novamente.")
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
          <h1 className="admin-title">Nova Obra</h1>
          <div className="admin-actions">
            <Link to="/admin/dashboard" className="admin-button admin-button-secondary">
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
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Voltar
            </Link>
          </div>
        </div>

        {error && <div className="admin-alert admin-alert-error">{error}</div>}

        <div className="admin-card">
          <div className="admin-card-body">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="admin-form">
              <div className="admin-form-group">
                <label className="admin-label">Título</label>
                <input 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  required 
                  className="admin-input" 
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Descrição</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  className="admin-textarea"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="admin-form-group">
                  <label className="admin-label">Preço (R$)</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Dimensões</label>
                  <input
                    value={dimensions}
                    onChange={(e) => setDimensions(e.target.value)}
                    required
                    className="admin-input"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Técnica</label>
                <input
                  value={technique}
                  onChange={(e) => setTechnique(e.target.value)}
                  required
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Imagem Principal</label>
                <input 
                  type="file" 
                  accept="image/*,video/mp4" 
                  onChange={(e) => setImagemPrincipal(e.target.files[0])} 
                  required 
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Imagens/Vídeos Adicionais</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {imagensAdicionais.map((file, idx) => {
                    const url = URL.createObjectURL(file)
                    return (
                      <div key={idx} className="admin-image-preview">
                        {file.type === "video/mp4" ? (
                          <video src={url} className="w-full h-full object-cover" controls muted />
                        ) : (
                          <img src={url} alt={`Novo adicional ${idx + 1}`} className="w-full h-full object-cover" />
                        )}
                        <div className="admin-image-actions">
                          <button
                            type="button"
                            onClick={() => {
                              setImagensAdicionais(imagensAdicionais.filter((_, i) => i !== idx))
                            }}
                            className="admin-image-action-button"
                            title="Remover"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  multiple
                  onChange={e => setImagensAdicionais([...imagensAdicionais, ...Array.from(e.target.files)])}
                  className="admin-input"
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Categorias</label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="admin-checkbox"
                      />
                      {cat.nome}
                    </label>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    checked={available} 
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="admin-checkbox"
                  />
                  Disponível
                </label>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="admin-button admin-button-primary" disabled={isSaving}>
                  {isSaving ? "Criando..." : "Criar Obra"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminNewArtworkPage
