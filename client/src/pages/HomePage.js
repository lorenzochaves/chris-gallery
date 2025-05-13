import { useEffect, useState, useRef } from "react"
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
  const carouselRef = useRef(null)

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

  // Força o início do autoplay quando o componente montar
  useEffect(() => {
    if (carouselRef.current) {
      const carousel = carouselRef.current;
      // Simula um clique no botão "próximo" para iniciar o autoplay
      setTimeout(() => {
        carousel.increment();
      }, 100);
    }
  }, [carrosselImages]);

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Hero Section */}
      <section className="relative h-screen">
        <Carousel
          ref={carouselRef}
          showThumbs={false}
          showStatus={false}
          showArrows={true}
          infiniteLoop={true}
          autoPlay={true}
          interval={3000}
          stopOnHover={false}
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
          <div className="text-left text-white max-w-2xl px-6 sm:px-8 md:px-12 lg:px-16">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold mb-4 sm:mb-6">
              Chris Fontenelle Galeria
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl font-light mb-8 sm:mb-12 max-w-xl">
              Explorando a natureza através de cores vibrantes e formas geométricas
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <Link
                to="/portfolio"
                className="px-8 sm:px-10 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 text-lg sm:text-xl flex items-center justify-center gap-3"
              >
                Ver Portfólio <span className="ml-2">→</span>
              </Link>
              <Link
                to="/sobre"
                className="px-8 sm:px-10 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border-2 border-white hover:bg-white/20 transition-all duration-300 text-lg sm:text-xl text-center"
              >
                Sobre a Artista
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Obras em Destaque */}
      <section className="container mx-auto py-16 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16 font-serif">Obras em Destaque</h2>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <p>Carregando obras...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12 mb-12 sm:mb-16">
              {featuredArtworks.map((artwork) => (
                <ArtworkCard key={artwork.id} artwork={artwork} categories={categories} />
              ))}
            </div>
          )}
          <div className="flex justify-center">
            <Link
              to="/portfolio"
              className="px-8 sm:px-10 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 hover:shadow-xl transition-all duration-300 text-lg sm:text-xl flex items-center gap-3"
            >
              Ver Todas as Obras <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      {/* Removido: Entre em Contato section */}
    </div>
  )
}

export default HomePage