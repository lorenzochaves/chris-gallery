"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Sample artwork data - in a real app, this would come from your database
const artworks = [
  {
    id: 1,
    title: "Obra 1",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 2,
    title: "Obra 2",
    image: "/placeholder.svg?height=1080&width=1920",
  },
  {
    id: 3,
    title: "Obra 3",
    image: "/placeholder.svg?height=1080&width=1920",
  },
]

export default function ArtSlideshow() {
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
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-1000",
            index === currentIndex ? "opacity-100" : "opacity-0",
          )}
        >
          <Image
            src={artwork.image || "/placeholder.svg"}
            alt={artwork.title}
            fill
            priority={index === 0}
            className="object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/70" />
    </div>
  )
}
