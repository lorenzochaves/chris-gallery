import { Link } from "react-router-dom"

const NotFoundPage = () => {
  return (
    <div className="container mx-auto flex h-[70vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl font-bold">404</h1>
      <h2 className="mt-4 text-2xl font-medium">Página não encontrada</h2>
      <p className="mt-2 text-gray-500">A página que você está procurando não existe ou foi removida.</p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90"
      >
        Voltar para a página inicial
      </Link>
    </div>
  )
}

export default NotFoundPage
