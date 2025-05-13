import { useEffect, useState } from "react"
import api from "../utils/api"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { Link } from "react-router-dom"

const AboutPage = () => {
  const [profile, setProfile] = useState(null)
  const [images, setImages] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/api/profile")
      setProfile(res.data)
      const imgRes = await api.get("/api/profile/images")
      setImages(imgRes.data)
    }
    fetchProfile()
  }, [])

  if (!profile) return <div className="container mx-auto py-16 px-4">Carregando...</div>

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: false,
    adaptiveHeight: false,
  }

  const uniqueImages = images.filter(
    (img, idx, arr) => arr.findIndex(i => i.url === img.url) === idx
  )

  // Garante pelo menos 2 slides para o carrossel funcionar corretamente
  const slides = uniqueImages.length === 1 ? [uniqueImages[0], uniqueImages[0]] : uniqueImages

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative w-full h-[280px] sm:h-[340px] md:h-[380px] flex items-center justify-center mb-[-40px] sm:mb-[-50px] md:mb-[-60px]"
        style={{
          background: `url('/background3.jpeg') center center / cover no-repeat`,
        }}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-2 sm:mb-4 font-serif tracking-wide">Sobre a Artista</h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto">Conheça a história e inspiração por trás das obras</p>
        </div>
      </section>

      <div className="container mx-auto py-12 sm:py-16 md:py-20 px-4 max-w-5xl mt-12 sm:mt-16">
        {/* Título e subtítulo */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide text-gray-900">Chris Fontenelle</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-2xl font-light">
          {profile.subtitulo || "O trabalho de uma vida de abraçar tanto o criativo quanto o quantitativo, desenvolvendo negócios online prósperos e marcas invejáveis."}
        </p>
        <hr className="border-t border-gray-200 mb-8 sm:mb-12" />

        {/* Grid principal */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 sm:gap-12 items-start">
          {/* Biografia */}
          <div className="prose prose-lg max-w-none">
            <p className="text-base sm:text-lg text-gray-800 leading-relaxed mb-8 sm:mb-10 font-serif whitespace-pre-line">
              {profile.bio}
            </p>
            <Link
              to="/contato"
              className="inline-block bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Entre em Contato
            </Link>
          </div>
          {/* Carrossel de fotos */}
          <div className="flex items-center justify-center bg-white rounded-xl shadow-2xl overflow-hidden min-h-[300px] sm:min-h-[360px] md:min-h-[420px] h-[300px] sm:h-[360px] md:h-[420px] w-full">
            {slides.length > 0 ? (
              <Slider {...sliderSettings} className="w-full h-full">
                {slides.map((img, idx) => (
                  <div key={img.id || idx} className="h-[300px] sm:h-[360px] md:h-[420px] w-full flex items-center justify-center">
                    <img
                      src={img.url}
                      alt="Artista"
                      className="object-cover h-[300px] sm:h-[360px] md:h-[420px] w-full"
                      style={{ maxHeight: '100%' }}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <img 
                src="/images/artist-placeholder.jpg" 
                alt="Retrato da Artista" 
                className="h-[300px] sm:h-[360px] md:h-[420px] w-full object-cover" 
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutPage