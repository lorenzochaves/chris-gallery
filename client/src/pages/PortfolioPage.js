"use client"

import { useState, useEffect } from "react"
import ArtworkCard from "../components/ArtworkCard"
import api from "../utils/api"

const PortfolioPage = () => {
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworksRes, categoriesRes] = await Promise.all([api.get("/api/artworks"), api.get("/api/categories")])

        setArtworks(artworksRes.data)
        setCategories(categoriesRes.data)
        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar dados:", error)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Carregar obras filtradas quando uma categoria é selecionada
  useEffect(() => {
    if (selectedCategory) {
      const fetchFilteredArtworks = async () => {
        setIsLoading(true)
        try {
          const response = await api.get(`/api/artworks/category/${selectedCategory}`)
          setArtworks(response.data)
        } catch (error) {
          console.error("Erro ao filtrar obras:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchFilteredArtworks()
    } else {
      // Se nenhuma categoria estiver selecionada, carregue todas as obras
      const fetchAllArtworks = async () => {
        setIsLoading(true)
        try {
          const response = await api.get("/api/artworks")
          setArtworks(response.data)
        } catch (error) {
          console.error("Erro ao carregar obras:", error)
        } finally {
          setIsLoading(false)
        }
      }

      fetchAllArtworks()
    }
  }, [selectedCategory])

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8 text-3xl font-bold">Portfólio</h1>

      {/* Categorias / Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        <button
          className={`badge ${selectedCategory === null ? "badge-primary" : "badge-outline"}`}
          onClick={() => setSelectedCategory(null)}
        >
          Todas
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            className={`badge ${selectedCategory === category.id ? "badge-primary" : "badge-outline"}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <p>Carregando obras...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}

      {!isLoading && artworks.length === 0 && (
        <div className="mt-8 text-center text-gray-500">Nenhuma obra encontrada nesta categoria.</div>
      )}
    </div>
  )
}

export default PortfolioPage
