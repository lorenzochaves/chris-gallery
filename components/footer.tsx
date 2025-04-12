import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {new Date().getFullYear()} Galeria de Arte. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/admin" className="text-sm text-muted-foreground hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
