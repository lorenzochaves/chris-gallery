"use client"

import { useState, useEffect } from "react"
import ArtworkCard from "@/components/artwork-card"
import { getArtworks, getCategories, type Category, type Artwork } from "@/lib/data"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export default function PortfolioPage() {
  const [artworks, setArtworks] = useState<Artwork[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const artworksData = await getArtworks()
        const categoriesData = await getCategories()

        setArtworks(artworksData)
        setCategories(categoriesData)
        setIsLoading(false)
      } catch (error) {
        console.error("Error loading data:", error)
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  // Filtrar obras por categoria
  const filteredArtworks = selectedCategory
    ? artworks.filter((artwork) => artwork.categoryIds.includes(selectedCategory))
    : artworks

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Portfólio</h1>

      {/* Categorias / Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer text-sm"
          onClick={() => setSelectedCategory(null)}
        >
          Todas
        </Badge>

        {categories.map((category) => (
          <Badge
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            className={cn("cursor-pointer text-sm", selectedCategory === category.id && "bg-primary")}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <p>Carregando obras...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredArtworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={{
                id: artwork.id,
                title: artwork.title,
                image: artwork.image,
                price: artwork.price,
                available: artwork.available,
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && filteredArtworks.length === 0 && (
        <div className="mt-8 text-center text-muted-foreground">Nenhuma obra encontrada nesta categoria.</div>
      )}
    </div>
  )
}
