"use server"

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Adicionando categorias ao modelo de dados
export type Category = {
  id: string
  name: string
  slug: string
}

export type Artwork = {
  id: string
  title: string
  description: string
  image: string
  additionalImages: string[]
  price: number | null
  available: boolean
  dimensions: string
  technique: string
  createdAt: string
  categoryIds: string[] // Referência às categorias
}

// Categorias iniciais
let categories: Category[] = [
  {
    id: "1",
    name: "Pinturas",
    slug: "pinturas",
  },
  {
    id: "2",
    name: "Esculturas",
    slug: "esculturas",
  },
  {
    id: "3",
    name: "Jarros",
    slug: "jarros",
  },
  {
    id: "4",
    name: "Abstratos",
    slug: "abstratos",
  },
]

// In a real application, you would use a database
// This is a simple in-memory store for demonstration purposes
let artworks: Artwork[] = [
  {
    id: "1",
    title: "Paisagem Abstrata",
    description: "Uma interpretação abstrata de uma paisagem natural, com cores vibrantes e texturas expressivas.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Detalhe+1",
      "/placeholder.svg?height=600&width=600&text=Detalhe+2",
      "/placeholder.svg?height=600&width=600&text=Detalhe+3",
    ],
    price: 1200,
    available: true,
    dimensions: "60 x 80 cm",
    technique: "Acrílica sobre tela",
    createdAt: "2023-05-15T00:00:00.000Z",
    categoryIds: ["1", "4"], // Pinturas, Abstratos
  },
  {
    id: "2",
    title: "Retrato Contemporâneo",
    description: "Um retrato contemporâneo que explora a identidade e emoção através de pinceladas expressivas.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Detalhe+1",
      "/placeholder.svg?height=600&width=600&text=Detalhe+2",
    ],
    price: 1500,
    available: true,
    dimensions: "50 x 70 cm",
    technique: "Óleo sobre tela",
    createdAt: "2023-08-22T00:00:00.000Z",
    categoryIds: ["1"], // Pinturas
  },
  {
    id: "3",
    title: "Composição Geométrica",
    description: "Uma composição geométrica que explora formas e cores em um arranjo harmonioso e equilibrado.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: [],
    price: null,
    available: false,
    dimensions: "40 x 40 cm",
    technique: "Técnica mista",
    createdAt: "2023-11-10T00:00:00.000Z",
    categoryIds: ["4"], // Abstratos
  },
  {
    id: "4",
    title: "Natureza Morta",
    description: "Uma natureza morta contemporânea que explora a relação entre objetos cotidianos e sua simbologia.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: ["/placeholder.svg?height=600&width=600&text=Detalhe+1"],
    price: 900,
    available: true,
    dimensions: "30 x 40 cm",
    technique: "Aquarela",
    createdAt: "2024-01-05T00:00:00.000Z",
    categoryIds: ["1"], // Pinturas
  },
  {
    id: "5",
    title: "Jarro Decorativo",
    description: "Um jarro decorativo feito à mão com técnicas tradicionais de cerâmica.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Detalhe+1",
      "/placeholder.svg?height=600&width=600&text=Detalhe+2",
    ],
    price: 450,
    available: true,
    dimensions: "25 x 15 cm",
    technique: "Cerâmica esmaltada",
    createdAt: "2023-09-18T00:00:00.000Z",
    categoryIds: ["3"], // Jarros
  },
  {
    id: "6",
    title: "Escultura Moderna",
    description: "Uma escultura moderna que explora a relação entre espaço e forma.",
    image: "/placeholder.svg?height=800&width=800",
    additionalImages: [
      "/placeholder.svg?height=600&width=600&text=Detalhe+1",
      "/placeholder.svg?height=600&width=600&text=Detalhe+2",
    ],
    price: 2200,
    available: true,
    dimensions: "45 x 20 x 20 cm",
    technique: "Bronze fundido",
    createdAt: "2022-11-05T00:00:00.000Z",
    categoryIds: ["2"], // Esculturas
  },
]

// Admin credentials (in a real app, use a proper auth system)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

// Get all artworks
export async function getArtworks() {
  return [...artworks]
}

// Get artwork by ID
export async function getArtworkById(id: string) {
  const artwork = artworks.find((artwork) => artwork.id === id) || null
  return artwork ? { ...artwork } : null
}

// Get all categories
export async function getCategories() {
  return [...categories]
}

// Get category by ID
export async function getCategoryById(id: string) {
  return categories.find((category) => category.id === id) || null
}

// Get artworks by category
export async function getArtworksByCategory(categoryId: string) {
  return artworks.filter((artwork) => artwork.categoryIds.includes(categoryId))
}

// Admin authentication
export async function adminLogin(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Set a cookie to indicate the user is logged in
    cookies().set("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

    redirect("/admin/dashboard")
  }

  return { error: "Credenciais inválidas" }
}

// Check if admin is logged in
export function isAdminLoggedIn() {
  return cookies().has("admin-auth")
}

// Admin logout
export async function adminLogout() {
  cookies().delete("admin-auth")
  redirect("/admin")
}

// Create new artwork
export async function createArtwork(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const price = formData.get("price") ? Number(formData.get("price")) : null
  const available = formData.get("available") === "on"
  const dimensions = formData.get("dimensions") as string
  const technique = formData.get("technique") as string

  // Get selected categories
  const selectedCategories = formData.getAll("categories") as string[]

  const newArtwork: Artwork = {
    id: String(Date.now()),
    title,
    description,
    image: image || "/placeholder.svg?height=800&width=800",
    additionalImages: [],
    price,
    available,
    dimensions,
    technique,
    createdAt: new Date().toISOString(),
    categoryIds: selectedCategories,
  }

  artworks = [...artworks, newArtwork]
  revalidatePath("/portfolio")
  redirect("/admin/dashboard")
}

// Update artwork
export async function updateArtwork(id: string, formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const image = formData.get("image") as string
  const price = formData.get("price") ? Number(formData.get("price")) : null
  const available = formData.get("available") === "on"
  const dimensions = formData.get("dimensions") as string
  const technique = formData.get("technique") as string

  // Get selected categories
  const selectedCategories = formData.getAll("categories") as string[]

  artworks = artworks.map((artwork) => {
    if (artwork.id === id) {
      return {
        ...artwork,
        title,
        description,
        image: image || artwork.image,
        price,
        available,
        dimensions,
        technique,
        categoryIds: selectedCategories,
      }
    }
    return artwork
  })

  revalidatePath("/portfolio")
  revalidatePath(`/portfolio/${id}`)
  redirect("/admin/dashboard")
}

// Delete artwork
export async function deleteArtwork(id: string) {
  artworks = artworks.filter((artwork) => artwork.id !== id)
  revalidatePath("/portfolio")
  redirect("/admin/dashboard")
}

// Create new category
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-")

  const newCategory: Category = {
    id: String(Date.now()),
    name,
    slug,
  }

  categories = [...categories, newCategory]
  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  redirect("/admin/categories")
}

// Update category
export async function updateCategory(id: string, formData: FormData) {
  const name = formData.get("name") as string
  const slug = (formData.get("slug") as string) || name.toLowerCase().replace(/\s+/g, "-")

  categories = categories.map((category) => {
    if (category.id === id) {
      return {
        ...category,
        name,
        slug,
      }
    }
    return category
  })

  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  redirect("/admin/categories")
}

// Delete category
export async function deleteCategory(id: string) {
  // Remove the category
  categories = categories.filter((category) => category.id !== id)

  // Remove the category from all artworks
  artworks = artworks.map((artwork) => ({
    ...artwork,
    categoryIds: artwork.categoryIds.filter((categoryId) => categoryId !== id),
  }))

  revalidatePath("/admin/categories")
  revalidatePath("/portfolio")
  redirect("/admin/categories")
}

// Helper function to get year from date
export function getYearFromDate(dateString: string) {
  return new Date(dateString).getFullYear()
}
