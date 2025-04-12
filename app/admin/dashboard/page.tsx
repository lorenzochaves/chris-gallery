import Link from "next/link"
import Image from "next/image"
import { getArtworks, adminLogout, deleteArtwork } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Edit, Plus, Trash, Tag } from "lucide-react"

export default async function AdminDashboardPage() {
  const artworks = await getArtworks()

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Painel Administrativo</h1>
        <div className="flex gap-4">
          <form action={adminLogout}>
            <Button variant="outline" type="submit">
              Sair
            </Button>
          </form>
          <Button asChild variant="outline">
            <Link href="/admin/categories">
              <Tag className="mr-2 h-4 w-4" /> Categorias
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/artworks/new">
              <Plus className="mr-2 h-4 w-4" /> Nova Obra
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {artworks.map((artwork) => (
          <Card key={artwork.id}>
            <div className="relative aspect-square">
              <Image src={artwork.image || "/placeholder.svg"} alt={artwork.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{artwork.title}</h3>
              <p className="text-sm text-muted-foreground">{artwork.available ? "Disponível" : "Indisponível"}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/artworks/edit/${artwork.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
              <form action={deleteArtwork.bind(null, artwork.id)}>
                <Button variant="destructive" size="sm" type="submit">
                  <Trash className="mr-2 h-4 w-4" /> Excluir
                </Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
