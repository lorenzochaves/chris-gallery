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
    <Link to={`/portfolio/${artwork.id}`} className="block group">
      <div
        className="gallery-item bg-white shadow-lg hover:shadow-xl transition-all duration-500 rounded-lg overflow-hidden"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-square overflow-hidden">
          {isVideo(mainUrl) ? (
            <video
              src={mainUrl}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
            <h3 className="text-2xl font-bold mb-2">{artwork.title}</h3>
            <div className="flex flex-wrap gap-2 justify-center">
              {categoryNames.map((name, index) => (
                <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                  {name}
                </span>
              ))}
            </div>
            {artwork.available && artwork.price && (
              <p className="mt-4 text-xl font-semibold">
                R$ {artwork.price.toLocaleString('pt-BR')}
              </p>
            )}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-medium text-gray-900 mb-2">{artwork.title}</h3>
          <div className="flex flex-wrap gap-2">
            {categoryNames.map((name, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ArtworkCard