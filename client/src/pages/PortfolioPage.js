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
      className="min-h-screen pt-20 sm:pt-24 md:pt-28 relative"
      style={{
        background: `linear-gradient(rgba(255,250,244,0.92), rgba(255,250,244,0.92)), url('/background1.jpeg') center center / cover no-repeat fixed`
      }}
    >
      <div className="container mx-auto py-8 sm:py-12 px-4">
        {/* Título e descrição */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold mb-3 sm:mb-4">Portfólio</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Explore a coleção de obras que capturam a essência da natureza através de cores vibrantes e formas geométricas únicas.
          </p>
        </div>

        {/* Categorias */}
        <div className="mb-8 sm:mb-12 flex flex-wrap gap-2 sm:gap-3 justify-center px-2">
          <button
            className={`px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg transition-all duration-300 ${
              selectedCategory === null 
                ? "bg-black text-white" 
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
          >
            Todas
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`px-4 sm:px-6 py-2 rounded-full text-base sm:text-lg transition-all duration-300 ${
                selectedCategory === category.id 
                  ? "bg-black text-white" 
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
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
          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl justify-center">
            {paginatedArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} categories={categories} />
            ))}
          </div>
        )}

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center mt-8 sm:mt-12 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`px-3 sm:px-4 py-2 rounded-full text-base sm:text-lg ${
                  currentPage === i + 1
                    ? "bg-black text-white border-black"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {!isLoading && paginatedArtworks.length === 0 && (
          <div className="mt-6 sm:mt-8 text-center text-gray-500 text-base sm:text-lg">Nenhuma obra encontrada nesta categoria.</div>
        )}
      </div>
    </div>
  )
}

export default PortfolioPage
