"use client"

import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import api from "../../utils/api"

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
      <div className="container mx-auto py-12 px-4 text-center">
        <p>Carregando categoria...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Editar Categoria</h1>
          <Link to="/admin/categories" className="btn btn-outline">
            Voltar
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          {error && <div className="mb-6 rounded-md bg-red-50 p-4 text-sm text-red-500">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Nome da Categoria
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="slug" className="block text-sm font-medium">
                Slug (opcional)
              </label>
              <input id="slug" type="text" value={slug} onChange={(e) => setSlug(e.target.value)} className="input" />
              <p className="text-xs text-gray-500">
                O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
              </p>
            </div>

            <div className="space-y-2">
              <label htmlFor="imagensAdicionais" className="block text-sm font-medium">
                Imagens Adicionais
              </label>
              <input
                id="imagensAdicionais"
                type="file"
                accept="image/*,video/mp4"
                multiple
                onChange={e => setImagensAdicionais([...e.target.files])}
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isSaving}>
              {isSaving ? "Salvando..." : "Atualizar Categoria"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminEditCategoryPage
