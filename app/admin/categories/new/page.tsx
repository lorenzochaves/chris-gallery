import { createCategory } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function NewCategoryPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Nova Categoria</h1>
        <Button asChild variant="outline">
          <Link href="/admin/categories">Voltar</Link>
        </Button>
      </div>

      <div className="mx-auto max-w-2xl">
        <form action={createCategory} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Nome da Categoria</Label>
            <Input id="name" name="name" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (opcional)</Label>
            <Input id="slug" name="slug" placeholder="categoria-exemplo" />
            <p className="text-xs text-muted-foreground">
              O slug é usado para URLs. Se não for fornecido, será gerado automaticamente a partir do nome.
            </p>
          </div>

          <Button type="submit" className="w-full">
            Criar Categoria
          </Button>
        </form>
      </div>
    </div>
  )
}
