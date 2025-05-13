// client/src/pages/admin/AdminEditArtworkPage.js

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../utils/api"
import "../../styles/admin.css"

const AdminEditArtworkPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [imagemPrincipal, setImagemPrincipal] = useState(null)
  const [price, setPrice] = useState("")
  const [available, setAvailable] = useState(true)
  const [dimensions, setDimensions] = useState("")
  const [technique, setTechnique] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
  const [additionalImages, setAdditionalImages] = useState([])
  const [imagensAdicionais, setImagensAdicionais] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworkRes, categoriesRes] = await Promise.all([
          api.get(`/api/artworks/${id}`),
          api.get("/api/categories"),
        ])
        const artwork = artworkRes.data
        setTitle(artwork.title)
        setDescription(artwork.description)
        setImage(artwork.image)
        setPrice(artwork.price || "")
        setAvailable(artwork.available)
        setDimensions(artwork.dimensions)
        setTechnique(artwork.technique)
        setSelectedCategories(artwork.category_ids || artwork.categoryIds || [])
        setAdditionalImages(artwork.additional_images || artwork.additionalImages || [])
        setCategories(categoriesRes.data)
      } catch (error) {
        setError("Erro ao carregar dados. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [id])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("price", price)
      formData.append("available", available)
      formData.append("dimensions", dimensions)
      formData.append("technique", technique)
      formData.append("artista", "Chris Fontenelle")
      formData.append("usuario_id", "1")
      selectedCategories.forEach((id) => formData.append("categoryIds", id))
      if (imagemPrincipal) formData.append("imagem_principal", imagemPrincipal)
      for (let file of imagensAdicionais) {
        formData.append("imagens_adicionais", file)
      }
      await api.put(`/api/artworks/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      navigate("/admin/dashboard")
    } catch (error) {
      setError("Erro ao atualizar obra. Tente novamente.")
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
          <h1 className="admin-title">Editar Obra</h1>
          <Link to="/admin/dashboard" className="admin-button admin-button-secondary">
            Voltar
          </Link>
        </div>

        <div className="admin-card">
          <div className="admin-card-body">
            {error && <div className="admin-alert admin-alert-error">{error}</div>}
            
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

              <div className="admin-form-group">
                <label className="admin-label">Imagem Principal</label>
                {image && (
                  <div className="admin-image-preview mb-4">
                    <img src={image} alt="Atual" className="w-full h-full object-cover" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,video/mp4"
                  onChange={(e) => setImagemPrincipal(e.target.files[0])}
                  className="admin-input"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Deixe em branco para manter a imagem atual.
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Imagens/Vídeos Adicionais</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {additionalImages.map((url, idx) => (
                    <div key={idx} className="admin-image-preview">
                      {url.match(/\.(mp4)$/i) ? (
                        <video src={url} className="w-full h-full object-cover" controls muted />
                      ) : (
                        <img src={url} alt={`Adicional ${idx + 1}`} className="w-full h-full object-cover" />
                      )}
                      <div className="admin-image-actions">
                        <button
                          type="button"
                          onClick={async () => {
                            if (window.confirm("Remover esta imagem?")) {
                              await api.post("/api/artworks/delete-additional-image", {
                                obraId: id,
                                imageUrl: url,
                              })
                              setAdditionalImages((imgs) => imgs.filter((img) => img !== url))
                            }
                          }}
                          className="admin-image-action-button"
                          title="Remover"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
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
                  onChange={(e) => setImagensAdicionais([...imagensAdicionais, ...Array.from(e.target.files)])}
                  className="admin-input"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Deixe em branco para manter as imagens atuais.
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                <label className="admin-label">Categorias</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {categories.map((cat) => (
                    <label key={cat.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.id)}
                        onChange={() => handleCategoryChange(cat.id)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">{cat.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={available}
                    onChange={(e) => setAvailable(e.target.checked)}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Disponível para venda</span>
                </label>
              </div>

              <div className="flex justify-end space-x-4">
                <Link to="/admin/dashboard" className="admin-button admin-button-secondary">
                  Cancelar
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="admin-button admin-button-primary"
                >
                  {isSaving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminEditArtworkPage