"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const ArtworkCard = ({ artwork }) => {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link to={`/portfolio/${artwork.id}`}>
      <div
        className="overflow-hidden rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-square">
          <img src={artwork.image || "/placeholder.svg"} alt={artwork.title} className="h-full w-full object-cover" />
          <div
            className={`absolute inset-0 flex items-center justify-center bg-black/60 text-white transition-opacity ${
              isHovering ? "opacity-100" : "opacity-0"
            }`}
          >
            {artwork.available && artwork.price ? `R$ ${artwork.price.toLocaleString("pt-BR")}` : "Indisponível"}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium">{artwork.title}</h3>
        </div>
      </div>
    </Link>
  )
}

export default ArtworkCard
