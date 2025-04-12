"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { notFound, useParams } from "next/navigation"
import { getArtworkById, getCategoryById, getYearFromDate } from "@/lib/data"
import { cn } from "@/lib/utils"

export default function ArtworkPage() {
  const { id } = useParams<{ id: string }>()
  const [artwork, setArtwork] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    async function loadArtwork() {
      try {
        const artworkData = await getArtworkById(id)

        if (!artworkData) {
          notFound()
        }

        setArtwork(artworkData)
        setSelectedImage(artworkData.image)

        // Carregar categorias
        const categoryPromises = artworkData.categoryIds.map((catId: string) => getCategoryById(catId))
        const categoryData = await Promise.all(categoryPromises)
        setCategories(categoryData.filter(Boolean))

        setIsLoading(false)
      } catch (error) {
        console.error("Error loading artwork:", error)
        setIsLoading(false)
      }
    }

    loadArtwork()
  }, [id])

  if (isLoading) {
    return (
      <div className="container flex h-[50vh] items-center justify-center">
        <p>Carregando obra...</p>
      </div>
    )
  }

  if (!artwork) {
    return notFound()
  }

  // Todas as imagens (principal + adicionais)
  const allImages = [artwork.image, ...artwork.additionalImages]

  return (
    <div className="container py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          {/* Imagem principal */}
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image src={selectedImage || artwork.image} alt={artwork.title} fill priority className="object-cover" />
          </div>

          {/* Miniaturas das imagens adicionais */}
          {allImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {allImages.map((image: string, index: number) => (
                <div
                  key={index}
                  className={cn(
                    "relative aspect-square cursor-pointer overflow-hidden rounded-md border-2",
                    selectedImage === image ? "border-primary" : "border-transparent",
                  )}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${artwork.title} - imagem ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            {categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category: any) => (
                  <span key={category.id} className="rounded-full bg-muted px-2 py-1 text-xs">
                    {category.name}
                  </span>
                ))}
              </div>
            )}
            <p className="mt-2 text-muted-foreground">Ano: {getYearFromDate(artwork.createdAt)}</p>
          </div>

          <div className="prose max-w-none">
            <p>{artwork.description}</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="mb-2 font-medium">Detalhes</div>
            <dl className="grid grid-cols-2 gap-1 text-sm">
              <dt>Dimensões</dt>
              <dd>{artwork.dimensions}</dd>
              <dt>Técnica</dt>
              <dd>{artwork.technique}</dd>
              <dt>Status</dt>
              <dd>{artwork.available ? "Disponível" : "Indisponível"}</dd>
              {artwork.available && artwork.price && (
                <>
                  <dt>Preço</dt>
                  <dd>R$ {artwork.price.toLocaleString("pt-BR")}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
