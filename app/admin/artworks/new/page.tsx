import { getCategories, createArtwork } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default async function NewArtworkPage() {
  const categories = await getCategories()

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nova Obra</h1>
        <Button asChild variant="outline">
          <Link href="/admin/dashboard">Voltar</Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <form action={createArtwork} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea id="description" name="description" rows={5} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">URL da Imagem</Label>
            <Input id="image" name="image" placeholder="/placeholder.svg?height=800&width=800" />
            <p className="text-xs text-muted-foreground">
              Deixe em branco para usar uma imagem padrão. Em um sistema real, você teria um uploader de imagens.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Preço (R$)</Label>
              <Input id="price" name="price" type="number" min="0" step="0.01" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dimensions">Dimensões</Label>
              <Input id="dimensions" name="dimensions" placeholder="Ex: 60 x 80 cm" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technique">Técnica</Label>
            <Input id="technique" name="technique" placeholder="Ex: Acrílica sobre tela" required />
          </div>

          <div className="space-y-2">
            <Label>Categorias</Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox id={`category-${category.id}`} name="categories" value={category.id} />
                  <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="available" name="available" defaultChecked />
            <Label htmlFor="available">Disponível para venda</Label>
          </div>

          <Button type="submit" className="w-full">
            Criar Obra
          </Button>
        </form>
      </div>
    </div>
  )
}
