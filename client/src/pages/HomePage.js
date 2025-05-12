import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import api from "../utils/api"

const HomePage = () => {
  const [carrosselImages, setCarrosselImages] = useState([])

  useEffect(() => {
    const fetchImgs = async () => {
      const res = await api.get("/api/profile/homepage-carrossel")
      setCarrosselImages(res.data)
    }
    fetchImgs()
  }, [])

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-28">
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

        {/* Overlay com texto */}
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white max-w-3xl px-4">
            <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
              Chris Fontenelle Art
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light">
              Arte contemporânea que transcende fronteiras
            </p>
            <Link
              to="/portfolio"
              className="inline-block px-8 py-4 bg-white text-black font-medium hover:bg-black hover:text-white transition-all duration-300"
            >
              Explorar Galeria
            </Link>
          </div>
        </div>
      </section>

      {/* Seção Contato */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-serif font-bold mb-6">
            Entre em Contato
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Interessado em adquirir uma obra ou tem alguma dúvida? Entre em
            contato conosco.
          </p>
          <Link
            to="/contato"
            className="inline-block px-8 py-4 bg-black text-white font-medium hover:bg-gray-800 transition-all duration-300"
          >
            Fale Conosco
          </Link>
        </div>
      </section>
    </div>
  )
}

export default HomePage