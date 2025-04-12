import Link from "next/link"
import { ArrowRight } from "lucide-react"
import ArtSlideshow from "@/components/art-slideshow"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="h-[60vh] w-full">
        <ArtSlideshow />
      </div>

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Galeria de Arte</h1>
        <p className="max-w-[600px] text-lg text-muted-foreground">
          Explore a coleção de obras de arte únicas e expressivas.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="gap-2">
            <Link href="/portfolio">
              Portfólio <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contato">Contato</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
