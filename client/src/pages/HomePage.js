import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import api from "../utils/api"
import ArtworkCard from "../components/ArtworkCard"

const HomePage = () => {
  const [carrosselImages, setCarrosselImages] = useState([])
  const [featuredArtworks, setFeaturedArtworks] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchImgs = async () => {
      const res = await api.get("/api/profile/homepage-carrossel")
      setCarrosselImages(res.data)
    }
    fetchImgs()
  }, [])

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const [artworksRes, categoriesRes] = await Promise.all([
          api.get("/api/artworks"),
          api.get("/api/categories"),
        ])
        setFeaturedArtworks(artworksRes.data.slice(0, 3))
        setCategories(categoriesRes.data)
        setIsLoading(false)
      } catch {
        setIsLoading(false)
      }
    }
    fetchFeatured()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Carousel
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={5000}
          stopOnHover={true}
          swipeable={true}
          className="h-full"
        >
          {carrosselImages.length > 0 ? (
            carrosselImages.map(img => (
              <div key={img.id}>
                <img
                  src={img.url}
                  alt="Artwork"
                  className="h-screen w-full object-cover"
                />
              </div>
            ))
          ) : (
            <div className="h-screen bg-gray-100 flex items-center justify-center">
              <p className="text-gray-500">Carregando imagens...</p>
            </div>
          )}
        </Carousel>

        {/* Overlay com texto alinhado à esquerda */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-start">
          <div className="text-left text-white max-w-2xl px-12">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-4">
              Flora Artística
            </h1>
            <p className="text-2xl md:text-3xl font-light mb-10">
              Explorando a natureza através de cores vibrantes e formas geométricas
            </p>
            <div className="flex flex-row gap-4">
              <Link
                to="/portfolio"
                className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-all duration-300 text-lg flex items-center gap-2"
              >
                Ver Portfólio <span className="ml-2">→</span>
              </Link>
              <Link
                to="/sobre"
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg border border-white hover:bg-gray-100 transition-all duration-300 text-lg"
              >
                Sobre a Artista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Obras em Destaque */}
      <section className="container mx-auto pt-8 pb-16 px-4">
        <h2 className="text-4xl font-bold text-center mb-10 font-serif">Obras em Destaque</h2>
        {isLoading ? (
          <div className="flex h-40 items-center justify-center">
            <p>Carregando obras...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-6xl mx-auto mb-8">
            {featuredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} categories={categories} />
            ))}
          </div>
        )}
        <div className="flex justify-center mt-4">
          <Link
            to="/portfolio"
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-all duration-300 text-lg flex items-center gap-2"
          >
            Ver Todas as Obras <span className="ml-2">→</span>
          </Link>
        </div>
      </section>

      {/* Seção Contato */}
      {/* Removido: Entre em Contato section */}
    </div>
  )
}

export default HomePage