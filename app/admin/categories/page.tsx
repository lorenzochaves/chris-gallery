import Link from "next/link"
import { getCategories, deleteCategory } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Edit, Plus, Trash, ArrowLeft } from "lucide-react"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Gerenciar Categorias</h1>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/admin/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/categories/new">
              <Plus className="mr-2 h-4 w-4" /> Nova Categoria
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Card key={category.id}>
            <CardContent className="p-4">
              <h3 className="font-medium">{category.name}</h3>
              <p className="text-sm text-muted-foreground">Slug: {category.slug}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button asChild variant="outline" size="sm">
                <Link href={`/admin/categories/edit/${category.id}`}>
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Link>
              </Button>
              <form action={deleteCategory.bind(null, category.id)}>
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
