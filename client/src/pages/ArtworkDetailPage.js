"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import api from "../utils/api"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

function isVideo(url) {
  return url && url.match(/\.(mp4)$/i)
}

const ArtworkDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artwork, setArtwork] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await api.get(`/api/artworks/${id}`)
        setArtwork(response.data)
        setSelectedImage(response.data.image)

        // Carregar categorias
        if (response.data.categoryIds && response.data.categoryIds.length > 0) {
          const categoryPromises = response.data.categoryIds.map((catId) => api.get(`/api/categories/${catId}`))

          const categoryResponses = await Promise.all(categoryPromises)
          const categoryData = categoryResponses.map((res) => res.data)
          setCategories(categoryData)
        }

        setIsLoading(false)
      } catch (error) {
        console.error("Erro ao carregar obra:", error)
        setIsLoading(false)
        if (error.response && error.response.status === 404) {
          navigate("/portfolio")
        }
      }
    }

    fetchArtwork()
  }, [id, navigate])

  if (isLoading) {
    return (
      <div className="container mx-auto flex h-[50vh] items-center justify-center">
        <p>Carregando obra...</p>
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold">Obra não encontrada</h1>
        <p className="mt-4">A obra que você está procurando não existe ou foi removida.</p>
      </div>
    )
  }

  // Todas as imagens (principal + adicionais)
  const allImages = [artwork.image, ...(artwork.additionalImages || [])]

  // Função para obter apenas o ano da data
  const getYear = (dateString) => {
    return new Date(dateString).getFullYear()
  }

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center pt-36">
      <div className="flex flex-col md:flex-row gap-8 items-start w-full max-w-5xl">
        {/* Imagem/vídeo principal com zoom */}
        <div className="flex flex-col items-center md:items-start min-w-[340px] max-w-md w-full">
          {isVideo(selectedImage || artwork.image) ? (
            <video
              src={selectedImage || artwork.image}
              className="rounded-lg shadow w-full h-[420px] object-cover bg-black"
              controls
              autoPlay
              loop
              muted
              playsInline
            />
          ) : (
            <Zoom>
              <img
                src={selectedImage || artwork.image}
                alt={artwork.title}
                className="rounded-lg shadow w-full h-[420px] object-cover bg-white"
              />
            </Zoom>
          )}
          {/* Miniaturas das imagens/vídeos adicionais */}
          <div className="flex gap-2 mt-4">
            {allImages.map((url, idx) =>
              isVideo(url) ? (
                <video
                  key={idx}
                  src={url}
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                  onClick={() => setSelectedImage(url)}
                  muted
                  playsInline
                />
              ) : (
                <img
                  key={idx}
                  src={url}
                  alt={`Adicional ${idx + 1}`}
                  className="w-20 h-20 object-cover rounded cursor-pointer"
                  onClick={() => setSelectedImage(url)}
                />
              )
            )}
          </div>
        </div>

        <div className="space-y-6 flex-1 min-w-[280px]">
          <div>
            <h1 className="text-3xl font-bold">{artwork.title}</h1>
            {categories.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span key={category.id} className="rounded-full bg-gray-100 px-2 py-1 text-xs">
                    {category.nome}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <p>{artwork.description}</p>
          </div>

          <div className="rounded-lg bg-gray-100 p-4">
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

export default ArtworkDetailPage
