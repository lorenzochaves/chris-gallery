import { useEffect, useState } from "react"
import api from "../utils/api"
import { FaInstagram, FaWhatsapp, FaEnvelope, FaPhone } from "react-icons/fa"

const ContactPage = () => {
  const [contacts, setContacts] = useState(null)

  useEffect(() => {
    const fetchContacts = async () => {
      const res = await api.get("/api/profile/contacts")
      setContacts(res.data)
    }
    fetchContacts()
  }, [])

  if (!contacts) return <div className="container mx-auto py-16 px-4">Carregando...</div>

  return (
    <div className="container mx-auto py-16 px-4 flex flex-col items-center pt-36">
      <h1 className="mb-12 text-center font-serif text-5xl font-light tracking-wide md:text-6xl">Contato</h1>
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="space-y-6">
          {contacts.email && (
            <div className="flex items-center gap-3 text-lg">
              <FaEnvelope className="text-gray-500" />
              <span><b>Email:</b> <a href={`mailto:${contacts.email}`} className="hover:underline">{contacts.email}</a></span>
            </div>
          )}
          {contacts.telefone && (
            <div className="flex items-center gap-3 text-lg">
              <FaPhone className="text-gray-500" />
              <span><b>Telefone:</b> {contacts.telefone}</span>
            </div>
          )}
          {contacts.whatsapp && (
            <div className="flex items-center gap-3 text-lg">
              <FaWhatsapp className="text-green-500" />
              <span>
                <b>WhatsApp:</b>{" "}
                <a
                  href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {contacts.whatsapp}
                </a>
              </span>
            </div>
          )}
          {contacts.instagram && (
            <div className="flex items-center gap-3 text-lg">
              <FaInstagram className="text-pink-500" />
              <span>
                <b>Instagram:</b>{" "}
                <a
                  href={`https://instagram.com/${contacts.instagram.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  @{contacts.instagram.replace("@", "")}
                </a>
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactPage