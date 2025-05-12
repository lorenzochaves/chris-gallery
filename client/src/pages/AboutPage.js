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
    <div className="container mx-auto py-16 px-4 max-w-5xl pt-36">
      {/* Título e subtítulo */}
      <h1 className="text-4xl md:text-5xl font-bold mb-2 font-serif uppercase tracking-wide">Chris Fontenelle</h1>
      <p className="text-gray-700 text-lg mb-4 max-w-2xl">
        {profile.subtitulo || "O trabalho de uma vida de abraçar tanto o criativo quanto o quantitativo, desenvolvendo negócios online prósperos e marcas invejáveis."}
      </p>
      <hr className="border-t border-gray-300 mb-8" />

      {/* Grid principal */}
      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Biografia */}
        <div>
          <p className="text-gray-900 text-lg leading-relaxed mb-8 whitespace-pre-line">
            {profile.bio}
          </p>
          <Link
            to="/contato"
            className="inline-block border-2 border-black px-6 py-2 rounded font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition"
          >
            Contate-me
          </Link>
        </div>
        {/* Carrossel de fotos */}
        <div className="flex items-center justify-center bg-white rounded-lg shadow-xl min-h-[420px] h-[420px] w-full">
          {slides.length > 0 ? (
            <Slider {...sliderSettings} className="w-full h-full">
              {slides.map((img, idx) => (
                <div key={img.id || idx} className="h-[420px] w-full flex items-center justify-center">
                  <img
                    src={img.url}
                    alt="Artista"
                    className="object-cover h-[420px] w-full rounded-lg"
                    style={{ maxHeight: 420 }}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <img src="/images/artist-placeholder.jpg" alt="Retrato da Artista" className="h-[420px] w-full object-cover rounded-lg" />
          )}
        </div>
      </div>
    </div>
  )
}

export default AboutPage