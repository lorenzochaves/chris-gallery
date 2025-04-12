import { getArtworkById, getCategories, updateArtwork } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditArtworkPageProps {
  params: {
    id: string
  }
}

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const artwork = await getArtworkById(params.id)
  const categories = await getCategories()

  if (!artwork) {
    notFound()
  }

  const updateArtworkWithId = updateArtwork.bind(null, params.id)

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Obra</h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">Voltar</Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <form action={updateArtworkWithId} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" defaultValue={artwork.title} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" name="description" rows={5} defaultValue={artwork.description} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input id="image" name="image" defaultValue={artwork.image} />
            <p className="text-xs text-muted-foreground">
              Deixe em branco para manter a imagem atual. Em um sistema real, você teria um uploader de imagens.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" defaultValue={artwork.price || ""} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensões</Label>
              <Input id="dimensions" name="dimensions" defaultValue={artwork.dimensions} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technique">Técnica</Label>
            <Input id="technique" name="technique" defaultValue={artwork.technique} required />
          </div>

          <div className="space-y-2">
            <Label>Categorias</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    name="categories"
                    value={category.id}
                    defaultChecked={artwork.categoryIds.includes(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="available" name="available" defaultChecked={artwork.available} />
            <Label htmlFor="available">Disponível para venda</Label>
          </div>

          <Button type="submit" className="w-full">
            Atualizar Obra
          </Button>
        </form>
      </div>
    </div>
  )
}
