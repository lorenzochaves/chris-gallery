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
    <nav className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-6 px-8">
        {/* Esquerda: Logo + Nome */}
        <div className="flex items-center gap-4">
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-contain rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            style={{ minWidth: 48 }}
          />
          <Link to="/" className="text-3xl font-bold font-serif tracking-wide hover:text-gray-700 transition-colors duration-300">
            Chris Fontenelle Art
          </Link>
        </div>

        {/* Centro: Navegação */}
        <div className="hidden md:flex items-center gap-12">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={`text-lg font-medium transition-all duration-300 relative ${
                isActive(route.href) 
                  ? "text-black after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-black" 
                  : "text-gray-600 hover:text-black after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-black hover:after:w-full after:transition-all after:duration-300"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
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
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-2 space-y-1">
            {routes.map((route) => (
              <Link
                key={route.href}
                to={route.href}
                className={`block py-2 px-4 text-base font-medium transition-colors duration-300 ${
                  isActive(route.href)
                    ? "text-black bg-gray-50"
                    : "text-gray-600 hover:text-black hover:bg-gray-50"
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
