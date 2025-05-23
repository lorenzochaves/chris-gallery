"use client"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  // Removido "Início" do menu de navegação
  const routes = [
    { href: "/portfolio", label: "Portfólio" },
    { href: "/sobre", label: "Sobre Mim" },
    { href: "/contato", label: "Contato" },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="w-full fixed top-0 z-50" style={{background: 'linear-gradient(90deg, #f8fafc 0%, #f3f4f6 60%, #e7e5e4 100%)'}}>
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 sm:px-8">
        {/* Esquerda: Nome do site (sem logo) */}
        <div className="flex items-center gap-4">
          <Link to="/" className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-fleur tracking-wide text-gray-900">
            Chris Fontenelle Art
          </Link>
        </div>

        {/* Centro: Navegação */}
        <div className="hidden md:flex items-center gap-8 lg:gap-16">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={`text-lg lg:text-xl font-normal transition-all duration-300 relative text-gray-600 hover:text-amber-700 ${
                isActive(route.href)
                  ? 'underline underline-offset-8 decoration-2 decoration-amber-400' : ''
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-gray-600 hover:text-amber-700 transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] shadow-lg" style={{background: 'linear-gradient(90deg, #f8fafc 0%, #f3f4f6 60%, #e7e5e4 100%)'}}>
          <div className="px-4 py-4 space-y-2">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={`block py-3 px-4 text-lg font-normal transition-colors duration-300 text-gray-600 hover:text-amber-700 hover:bg-white/50 rounded-lg ${
                  isActive(route.href)
                    ? 'bg-white/30 text-amber-700' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {route.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
