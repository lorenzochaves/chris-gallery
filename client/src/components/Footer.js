import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
          © {new Date().getFullYear()} Galeria de Arte. Todos os direitos reservados.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-sm text-gray-500 hover:underline">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
