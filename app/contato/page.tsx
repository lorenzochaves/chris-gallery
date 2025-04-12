import { Mail, Phone, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContatoPage() {
  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">Contato</h1>

      <div className="mx-auto max-w-2xl space-y-8">
        <p className="text-lg text-muted-foreground">Entre em contato através de um dos canais abaixo:</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-lg border p-6 text-center">
            <Phone className="mb-4 h-8 w-8" />
            <h2 className="mb-2 text-xl font-medium">WhatsApp</h2>
            <p className="mb-4 text-muted-foreground">(00) 00000-0000</p>
            <Button asChild variant="outline">
              <Link href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer">
                Enviar mensagem
              </Link>
            </Button>
          </div>

          <div className="flex flex-col items-center rounded-lg border p-6 text-center">
            <Mail className="mb-4 h-8 w-8" />
            <h2 className="mb-2 text-xl font-medium">Email</h2>
            <p className="mb-4 text-muted-foreground">contato@galeriadearte.com</p>
            <Button asChild variant="outline">
              <Link href="mailto:contato@galeriadearte.com">Enviar email</Link>
            </Button>
          </div>

          <div className="flex flex-col items-center rounded-lg border p-6 text-center sm:col-span-2">
            <Instagram className="mb-4 h-8 w-8" />
            <h2 className="mb-2 text-xl font-medium">Instagram</h2>
            <p className="mb-4 text-muted-foreground">@galeriadearte</p>
            <Button asChild variant="outline">
              <Link href="https://instagram.com/galeriadearte" target="_blank" rel="noopener noreferrer">
                Seguir
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
