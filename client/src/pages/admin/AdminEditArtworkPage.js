// client/src/pages/admin/AdminEditArtworkPage.js

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../utils/api"

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
      formData.append("artista", "Chris Fontenelle") // or use artwork.artist if you want
      formData.append("usuario_id", "1") // Assuming a default user ID
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
    return <div className="container mx-auto py-12 px-4 text-center">Carregando dados...</div>
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Obra</h1>
          <Link to="/admin/dashboard" className="btn btn-outline">
            Voltar
          </Link>
        </div>
        <div className="mx-auto max-w-2xl">
          {error && <div className="mb-6 bg-red-100 p-4 text-sm text-red-600 rounded">{error}</div>}
          <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
            <div>
              <label className="block text-sm font-medium">Título</label>
              <input value={title} onChange={(e) => setTitle(e.target.value)} required className="input w-full" />
            </div>
            <div>
              <label className="block text-sm font-medium">Descrição</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Imagem Principal</label>
              {image && (
                <div className="mb-2">
                  <img src={image} alt="Atual" style={{ maxWidth: 200, borderRadius: 8 }} />
                </div>
              )}
              <input
                type="file"
                accept="image/*,video/mp4"
                onChange={(e) => setImagemPrincipal(e.target.files[0])}
              />
              <div className="text-xs text-gray-500">Deixe em branco para manter a imagem atual.</div>
            </div>
            <div>
              <label className="block text-sm font-medium">Imagens/Vídeos Adicionais</label>
              <div className="flex flex-wrap gap-2 mb-2">
                {additionalImages.map((url, idx) => (
                  <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                    {url.match(/\.(mp4)$/i) ? (
                      <video src={url} style={{ maxWidth: 100, borderRadius: 4 }} controls muted />
                    ) : (
                      <img src={url} alt={`Adicional ${idx + 1}`} style={{ maxWidth: 100, borderRadius: 4 }} />
                    )}
                    <button
                      type="button"
                      onClick={async () => {
                        if (window.confirm("Remover esta imagem?")) {
                          await api.post("/api/artworks/delete-additional-image", {
                            obraId: id,
                            imageUrl: url,
                          });
                          setAdditionalImages((imgs) => imgs.filter((img) => img !== url));
                        }
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "rgba(255,0,0,0.7)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: 24,
                        height: 24,
                        cursor: "pointer",
                      }}
                      title="Remover"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {imagensAdicionais.map((file, idx) => {
                  const url = URL.createObjectURL(file)
                  return (
                    <div key={idx} style={{ position: "relative", display: "inline-block" }}>
                      {file.type === "video/mp4" ? (
                        <video src={url} style={{ maxWidth: 100, borderRadius: 4 }} controls muted />
                      ) : (
                        <img src={url} alt={`Novo adicional ${idx + 1}`} style={{ maxWidth: 100, borderRadius: 4 }} />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setImagensAdicionais(imagensAdicionais.filter((_, i) => i !== idx))
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          background: "rgba(255,0,0,0.7)",
                          color: "#fff",
                          border: "none",
                          borderRadius: "50%",
                          width: 24,
                          height: 24,
                          cursor: "pointer",
                        }}
                        title="Remover"
                      >
                        ×
                      </button>
                    </div>
                  )
                })}
              </div>
              <input
                type="file"
                accept="image/*,video/mp4"
                multiple
                onChange={e => setImagensAdicionais([...imagensAdicionais, ...Array.from(e.target.files)])}
              />
              <div className="text-xs text-gray-500">Deixe em branco para manter as imagens atuais.</div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Preço (R$)</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Dimensões</label>
                <input
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  required
                  className="input w-full"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium">Técnica</label>
              <input
                value={technique}
                onChange={(e) => setTechnique(e.target.value)}
                required
                className="input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Categorias</label>
              <div className="grid sm:grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <label key={cat.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat.id)}
                      onChange={() => handleCategoryChange(cat.id)}
                    />
                    {cat.nome || cat.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={available}
                onChange={(e) => setAvailable(e.target.checked)}
              />
              <label>Disponível para venda</label>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Atualizar Obra"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminEditArtworkPage