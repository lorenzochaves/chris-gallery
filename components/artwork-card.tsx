"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

// Define a clear interface for the props
interface ArtworkCardProps {
  artwork: {
    id: string
    title: string
    image: string
    price: number | null
    available: boolean
  }
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const [isHovering, setIsHovering] = useState(false)

  return (
    <Link href={`/portfolio/${artwork.id}`}>
      <Card
        className="overflow-hidden transition-all duration-300 hover:shadow-md"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative aspect-square">
          <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center bg-black/60 text-white transition-opacity",
              isHovering ? "opacity-100" : "opacity-0",
            )}
          >
            {artwork.available && artwork.price ? `R$ ${artwork.price.toLocaleString("pt-BR")}` : "Indisponível"}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-medium">{artwork.title}</h3>
        </CardContent>
      </Card>
    </Link>
  )
}
