import { Link } from "react-router-dom"
import ArtSlideshow from "../components/ArtSlideshow"

const HomePage = () => {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="h-[60vh] w-full">
        <ArtSlideshow />
      </div>

      <div className="container mx-auto flex flex-1 flex-col items-center justify-center gap-8 py-16 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Galeria de Arte</h1>
        <p className="max-w-[600px] text-lg text-gray-500">Explore a coleção de obras de arte únicas e expressivas.</p>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            to="/portfolio"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90"
          >
            Portfólio
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
          <Link
            to="/contato"
            className="inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-100"
          >
            Contato
          </Link>
        </div>
      </div>
    </main>
  )
}

export default HomePage
