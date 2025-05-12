import { Link } from "react-router-dom"
import { FaInstagram, FaEnvelope, FaWhatsapp, FaPhone } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "../utils/api"

const Footer = () => {
  const [contacts, setContacts] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/api/profile/contacts")
        setContacts(res.data)
      } catch {}
    }
    fetchContacts()
  }, [])

  return (
    <footer className="bg-[#181e29] text-white pt-12 pb-4 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-8">
        {/* Coluna 1: Descrição */}
        <div>
          <h2 className="text-2xl font-bold mb-2">Chris Fontenelle</h2>
          <p className="text-gray-300 text-base">Explorando a natureza através de cores vibrantes e formas geométricas.</p>
        </div>
        {/* Coluna 2: Links */}
        <div>
          <h3 className="text-xl font-bold mb-2">Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/portfolio" className="hover:underline">Portfólio</Link></li>
            <li><Link to="/sobre" className="hover:underline">Sobre</Link></li>
            <li><Link to="/contato" className="hover:underline">Contato</Link></li>
          </ul>
        </div>
        {/* Coluna 3: Contato */}
        <div>
          <h3 className="text-xl font-bold mb-2">Contato</h3>
          <ul className="space-y-2 text-gray-300">
            {contacts ? (
              <>
                {contacts.instagram && <li className="flex items-center gap-2"><FaInstagram className="text-pink-400" /> <a href={`https://instagram.com/${contacts.instagram.replace("@", "")}`} className="hover:underline" target="_blank" rel="noopener noreferrer">Instagram: @{contacts.instagram.replace("@", "")}</a></li>}
                {contacts.email && <li className="flex items-center gap-2"><FaEnvelope className="text-green-300" /> <a href={`mailto:${contacts.email}`} className="hover:underline" target="_blank" rel="noopener noreferrer">Email: {contacts.email}</a></li>}
                {contacts.whatsapp && <li className="flex items-center gap-2"><FaWhatsapp className="text-green-400" /> <a href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`} className="hover:underline" target="_blank" rel="noopener noreferrer">WhatsApp: {contacts.whatsapp}</a></li>}
                {contacts.telefone && <li className="flex items-center gap-2"><FaPhone className="text-blue-300" /> <a href={`tel:${contacts.telefone.replace(/\D/g, "")}`} className="hover:underline">Telefone: {contacts.telefone}</a></li>}
              </>
            ) : (
              <li className="text-gray-400">Carregando...</li>
            )}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-6 text-gray-400 text-sm">
        <span>© {new Date().getFullYear()} Chris Fontenelle. Todos os direitos reservados.</span>
      </div>
    </footer>
  )
}

export default Footer
