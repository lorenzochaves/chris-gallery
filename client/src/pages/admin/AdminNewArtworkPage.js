"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/api"

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
    return <div className="p-4 text-center">Carregando categorias...</div>
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Nova Obra</h1>
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
              <label className="block text-sm font-medium">Imagem Principal</label>
              <input type="file" accept="image/*,video/mp4" onChange={(e) => setImagemPrincipal(e.target.files[0])} required />
            </div>

            <div>
              <label className="block text-sm font-medium">Imagens/Vídeos Adicionais</label>
              <div className="flex flex-wrap gap-2 mb-2">
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
                    {cat.nome}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" checked={available} onChange={(e) => setAvailable(e.target.checked)} />
              <label>Disponível</label>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSaving}>
              {isSaving ? "Criando..." : "Criar Obra"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminNewArtworkPage
