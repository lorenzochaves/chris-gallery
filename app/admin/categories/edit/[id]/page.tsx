import { getCategoryById, updateCategory } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { notFound } from "next/navigation"

interface EditCategoryPageProps {
  params: {
    id: string
  }
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  const updateCategoryWithId = updateCategory.bind(null, params.id)

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Editar Categoria</h1>
        <Button asChild variant="outline">
          <Link href="/admin/categories">Voltar</Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <form action={updateCategoryWithId} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input id="name" name="name" defaultValue={category.name} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (opcional)</Label>
            <Input id="slug" name="slug" defaultValue={category.slug} />
            <p className="text-xs text-muted-foreground">
              O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Atualizar Categoria
          </Button>
        </form>
      </div>
    </div>
  )
}
