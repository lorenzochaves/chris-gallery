import { useState } from "react"
import { Link } from "react-router-dom"

function isVideo(url) {
  return url && url.match(/\.(mp4)$/i)
}

const ArtworkCard = ({ artwork, categories = [] }) => {
  const [isHovering, setIsHovering] = useState(false)

  const categoryNames = (artwork.categoryIds || [])
    .map(id => {
      const cat = categories.find(c => c.id === id || c.id === String(id))
      return cat ? (cat.nome || cat.name) : null
    })
    .filter(Boolean)

  const mainUrl = artwork.image || (artwork.additionalImages && artwork.additionalImages[0]) || "/placeholder.svg"

  return (
    <Link to={`/portfolio/${artwork.id}`} className="block">
      <div
        className="gallery-item bg-white shadow-lg hover:shadow-xl transition-all duration-500"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          {isVideo(mainUrl) ? (
            <video
              src={mainUrl}
              className="w-full h-full object-cover transition-transform duration-700"
              autoPlay
              loop
              muted
              playsInline
              style={{ background: "#000" }}
            />
          ) : (
            <img 
              src={mainUrl} 
              alt={artwork.title} 
              className="w-full h-full object-cover transition-transform duration-700"
            />
          )}
          <div
            className={`absolute inset-0 bg-black/0 transition-all duration-500 flex items-end ${
              isHovering ? "bg-black/40" : ""
            }`}
          >
            <div className={`w-full p-6 transform transition-all duration-500 ${
              isHovering ? "translate-y-0" : "translate-y-full"
            }`}>
              <h3 className="text-xl font-serif font-bold text-white mb-2">{artwork.title}</h3>
              {artwork.available && artwork.price && (
                <p className="text-white/90 font-medium">
                  R$ {artwork.price.toLocaleString("pt-BR")}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 text-center">
          <h3 className="text-lg font-serif font-bold text-gray-900 mb-0 truncate">{artwork.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default ArtworkCard