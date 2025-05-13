"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import api from "../utils/api"
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { FaInstagram, FaShareAlt } from "react-icons/fa"

function isVideo(url) {
  return url && url.match(/\.(mp4)$/i)
}

const TABS = ["Descrição", "Detalhes"]

const ArtworkDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [artwork, setArtwork] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("Detalhes")

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
    <div
      className="min-h-screen pt-24 sm:pt-28 md:pt-36"
      style={{
        background: `linear-gradient(rgba(255,250,244,0.92), rgba(255,250,244,0.92)), url('/background1.jpeg') center center / cover no-repeat fixed`
      }}
    >
      <div className="container mx-auto py-8 sm:py-12 px-4 flex flex-col items-center">
        <div className="w-full max-w-6xl mb-4">
          <Link to="/portfolio" className="inline-flex items-center text-gray-600 hover:text-black text-base sm:text-lg font-medium mb-4">
            <span className="mr-2 text-xl sm:text-2xl">←</span> Voltar para o portfólio
          </Link>
        </div>
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 items-start w-full max-w-6xl">
          {/* Imagem/vídeo principal com zoom */}
          <div className="flex flex-col items-center md:items-start w-full md:min-w-[340px] md:max-w-md">
            {isVideo(selectedImage || artwork.image) ? (
              <video
                src={selectedImage || artwork.image}
                className="rounded-lg shadow w-full h-[300px] sm:h-[360px] md:h-[420px] object-cover bg-black"
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
                  className="rounded-lg shadow w-full h-[300px] sm:h-[360px] md:h-[420px] object-cover bg-white"
                />
              </Zoom>
            )}
            {/* Miniaturas das imagens/vídeos adicionais */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 w-full">
              {allImages.map((url, idx) =>
                isVideo(url) ? (
                  <video
                    key={idx}
                    src={url}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer flex-shrink-0"
                    onClick={() => setSelectedImage(url)}
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    key={idx}
                    src={url}
                    alt={`Adicional ${idx + 1}`}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded cursor-pointer flex-shrink-0"
                    onClick={() => setSelectedImage(url)}
                  />
                )
              )}
            </div>
          </div>

          {/* Info principal */}
          <div className="space-y-4 sm:space-y-6 flex-1 min-w-[280px]">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2 font-serif">{artwork.title}</h1>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
                {categories.length > 0 && categories.map((cat) => (
                  <span key={cat.id} className="rounded-full bg-green-100 text-green-800 px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold">
                    {cat.nome}
                  </span>
                ))}
                <span className="text-gray-500 font-medium text-sm sm:text-base">{getYear(artwork.created_at || artwork.createdAt || artwork.ano || new Date())}</span>
              </div>

              {/* Tabs */}
              <div className="flex gap-2 mb-4 sm:mb-6">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    className={`px-3 sm:px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all duration-200 text-sm sm:text-base ${activeTab === tab ? 'bg-white border-green-600 text-green-700 shadow' : 'bg-gray-100 border-transparent text-gray-500'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-b-lg shadow p-4 sm:p-6 mb-4 sm:mb-6">
                {activeTab === "Descrição" && (
                  <div className="prose max-w-none text-sm sm:text-base">
                    <p>{artwork.description}</p>
                  </div>
                )}
                {activeTab === "Detalhes" && (
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                    <div>
                      <dt className="font-semibold text-gray-700">Técnica</dt>
                      <dd className="text-gray-900">{artwork.technique}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Dimensões</dt>
                      <dd className="text-gray-900">{artwork.dimensions}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Preço</dt>
                      <dd className="text-gray-900">{artwork.price ? `R$ ${artwork.price.toLocaleString('pt-BR')}` : '-'}</dd>
                    </div>
                    <div>
                      <dt className="font-semibold text-gray-700">Disponível</dt>
                      <dd className="text-gray-900">{artwork.available ? 'Sim' : 'Não'}</dd>
                    </div>
                    {artwork.materials && (
                      <div className="col-span-1 sm:col-span-2">
                        <dt className="font-semibold text-gray-700">Materiais</dt>
                        <dd className="text-gray-900">{artwork.materials}</dd>
                      </div>
                    )}
                  </dl>
                )}
              </div>

              {/* Compartilhar */}
              <div className="mb-4 sm:mb-6">
                <div className="font-semibold mb-2 text-sm sm:text-base">Compartilhar</div>
                <div className="flex gap-3">
                  <a
                    href={`https://instagram.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-gray-100 hover:bg-pink-100 text-pink-600 text-lg sm:text-xl"
                    title="Instagram"
                  >
                    <FaInstagram />
                  </a>
                  <button
                    className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded bg-gray-100 hover:bg-green-100 text-green-700 text-lg sm:text-xl"
                    title="Copiar link"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                    }}
                  >
                    <FaShareAlt />
                  </button>
                </div>
              </div>

              {/* Interessado nesta obra? */}
              <div className="bg-gray-50 rounded-lg p-4 sm:p-5 mt-6 sm:mt-8">
                <div className="font-bold text-base sm:text-lg mb-2">Interessado nesta obra?</div>
                <div className="text-gray-700 mb-4 text-sm sm:text-base">Entre em contato para mais informações sobre disponibilidade e preços.</div>
                <a
                  href="/contato"
                  className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-all duration-300 text-sm sm:text-base"
                >
                  Solicitar Informações
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtworkDetailPage
