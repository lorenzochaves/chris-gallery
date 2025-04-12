"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../../utils/api"

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
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nova Categoria</h1>
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
            <input
              id="slug"
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="input"
              placeholder="categoria-exemplo"
            />
            <p className="text-xs text-gray-500">
              O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
            </p>
          </div>

          <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
            {isLoading ? "Criando..." : "Criar Categoria"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminNewCategoryPage
