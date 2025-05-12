"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import api from "../../utils/api"

const AdminCategoriesPage = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Tem certeza que deseja excluir esta categoria? Isso também removerá a categoria de todas as obras.",
      )
    ) {
      try {
        await api.delete(`/api/categories/${id}`)
        setCategories(categories.filter((category) => category.id !== id))
      } catch (error) {
        console.error("Erro ao excluir categoria:", error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>
          <div className="flex gap-4">
            <Link to="/admin/dashboard" className="btn btn-outline flex items-center gap-2">
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
                <path d="m12 19-7-7 7-7" />
                <path d="M19 12H5" />
              </svg>
              Voltar
            </Link>
            <Link to="/admin/categories/new" className="btn btn-primary flex items-center gap-2">
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
                <path d="M5 12h14" />
                <path d="M12 5v14" />
              </svg>
              Nova Categoria
            </Link>
          </div>
        </div>

        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <p>Carregando categorias...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {categories.map((category) => (
              <div key={category.id} className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4">
                  <h3 className="font-medium">{category.name}</h3>
                  <p className="text-sm text-gray-500">Slug: {category.slug}</p>
                </div>
                <div className="flex justify-between p-4 pt-0">
                  <Link
                    to={`/admin/categories/edit/${category.id}`}
                    className="btn btn-outline btn-sm flex items-center gap-2"
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
                    Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="btn btn-destructive btn-sm flex items-center gap-2"
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
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && categories.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            Nenhuma categoria cadastrada. Clique em "Nova Categoria" para adicionar.
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminCategoriesPage
