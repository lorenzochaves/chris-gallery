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
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center px-4">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <span className="text-xl font-bold">Galeria</span>
        </Link>

        <nav className="hidden flex-1 items-center space-x-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={`text-sm font-medium transition-colors hover:text-gray-600 ${
                isActive(route.href) ? "text-black" : "text-gray-500"
              }`}
            >
              {route.label}
            </Link>
          ))}
        </nav>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="sr-only">Abrir menu</span>
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
            className="h-6 w-6"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </button>

        {isMenuOpen && (
          <div className="absolute inset-x-0 top-16 z-50 w-full bg-white p-4 shadow-lg md:hidden">
            <nav className="grid gap-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  to={route.href}
                  className={`text-lg font-medium transition-colors hover:text-gray-600 ${
                    isActive(route.href) ? "text-black" : "text-gray-500"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
