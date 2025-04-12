"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../utils/api"

const AdminEditArtworkPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState("")
  const [price, setPrice] = useState("")
  const [available, setAvailable] = useState(true)
  const [dimensions, setDimensions] = useState("")
  const [technique, setTechnique] = useState("")
  const [categories, setCategories] = useState([])
  const [selectedCategories, setSelectedCategories] = useState([])
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
        setSelectedCategories(artwork.categoryIds || [])

        setCategories(categoriesRes.data)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setError("Erro ao carregar dados. Tente novamente.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleCategoryChange = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId)
      } else {
        return [...prev, categoryId]
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      await api.put(`/api/artworks/${id}`, {
        title,
        description,
        image,
        price: price ? Number(price) : null,
        available,
        dimensions,
        technique,
        categoryIds: selectedCategories,
      })
      navigate("/admin/dashboard")
    } catch (error) {
      console.error("Erro ao atualizar obra:", error)
      setError("Erro ao atualizar obra. Tente novamente.")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Carregando dados...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Obra</h1>
        <Link to="/admin/dashboard" className="btn btn-outline">
          Voltar
        </Link>
      </div>

      <div className="mx-auto max-w-2xl">
        {error && <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium">
              Título
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium">
              Descrição
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="input min-h-[100px]"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium">
              URL da Imagem
            </label>
            <input id="image" type="text" value={image} onChange={(e) => setImage(e.target.value)} className="input" />
            <p className="text-xs text-gray-500">
              Deixe em branco para manter a imagem atual. Em um sistema real, você teria um uploader de imagens.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="price" className="block text-sm font-medium">
                Preço (R$)
              </label>
              <input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="dimensions" className="block text-sm font-medium">
                Dimensões
              </label>
              <input
                id="dimensions"
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                className="input"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="technique" className="block text-sm font-medium">
              Técnica
            </label>
            <input
              id="technique"
              type="text"
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
              className="input"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">Categorias</label>
            <div className="grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`category-${category.id}`}
                    checked={selectedCategories.includes(category.id)}
                    onChange={() => handleCategoryChange(category.id)}
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <label htmlFor={`category-${category.id}`} className="text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              checked={available}
              onChange={(e) => setAvailable(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
            />
            <label htmlFor="available" className="text-sm font-medium">
              Disponível para venda
            </label>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isSaving}>
            {isSaving ? "Salvando..." : "Atualizar Obra"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminEditArtworkPage
