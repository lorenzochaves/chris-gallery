"use client"

import { useState, useEffect } from "react"
import ArtworkCard from "../components/ArtworkCard"
import api from "../utils/api"

const CARDS_PER_PAGE = 15

const PortfolioPage = () => {
  const [artworks, setArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artworksRes, categoriesRes] = await Promise.all([
          api.get("/api/artworks"),
          api.get("/api/categories"),
        ])
        setArtworks(artworksRes.data)
        setCategories(categoriesRes.data)
        setIsLoading(false)
      } catch (error) {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  // Filtragem por categoria
  const filteredArtworks = selectedCategory
    ? artworks.filter(artwork =>
        (artwork.categoryIds || []).includes(selectedCategory)
      )
    : artworks

  // Paginação
  const totalPages = Math.ceil(filteredArtworks.length / CARDS_PER_PAGE)
  const paginatedArtworks = filteredArtworks.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  )

  return (
    <div
      className="min-h-screen pt-28 relative"
      style={{
        background: `linear-gradient(rgba(255,250,244,0.92), rgba(255,250,244,0.92)), url('/background1.jpeg') center center / cover no-repeat fixed`
      }}
    >
      <div className="container mx-auto py-12 px-4">
        <h1 className="mb-8 text-3xl font-bold text-center">Portfólio</h1>

        {/* Categorias */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          <button
            className={`badge ${selectedCategory === null ? "badge-primary" : "badge-outline"}`}
            onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`badge ${selectedCategory === category.id ? "badge-primary" : "badge-outline"}`}
              onClick={() => { setSelectedCategory(category.id); setCurrentPage(1); }}
            >
              {category.nome || category.name}
            </button>
          ))}
        </div>

        {/* Cards */}
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <p>Carregando obras...</p>
          </div>
        ) : (
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-12 max-w-6xl justify-center">
            {paginatedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} categories={categories} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-4 py-2 rounded-full border ${
                  currentPage === i + 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-black border-gray-300 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {!isLoading && paginatedArtworks.length === 0 && (
          <div className="mt-8 text-center text-gray-500">Nenhuma obra encontrada nesta categoria.</div>
        )}
      </div>
    </div>
  )
}

export default PortfolioPage
