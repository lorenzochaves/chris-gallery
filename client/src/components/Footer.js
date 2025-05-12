import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-gray-500 md:text-left">
          © {new Date().getFullYear()} Chris Fontenelle Art. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
