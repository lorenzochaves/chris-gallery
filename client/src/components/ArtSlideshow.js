"use client"

import { useState, useEffect } from "react"

// Dados de exemplo para o slideshow
const artworks = [
  {
    id: 1,
    title: "Obra 1",
    image: "/images/placeholder-1.jpg",
  },
  {
    id: 2,
    title: "Obra 2",
    image: "/images/placeholder-2.jpg",
  },
  {
    id: 3,
    title: "Obra 3",
    image: "/images/placeholder-3.jpg",
  },
]

const ArtSlideshow = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % artworks.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-full w-full overflow-hidden">
      {artworks.map((artwork, index) => (
        <div
          key={artwork.id}
          className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={artwork.image || "/placeholder.svg"} alt={artwork.title} className="h-full w-full object-cover" />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30" />
    </div>
  )
}

export default ArtSlideshow
