import React, { useEffect, useState } from "react"
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"
import api from "../utils/api"

const FAQS = [
  {
    q: "Como adquirir uma obra?",
    a: "Para adquirir uma obra, entre em contato através do formulário ou diretamente por email. Informaremos sobre disponibilidade, preços e formas de pagamento."
  },
  {
    q: "Vocês fazem entregas internacionais?",
    a: "Sim, realizamos entregas para todo o Brasil e exterior. Os custos de envio variam de acordo com o destino e são calculados separadamente."
  },
  {
    q: "É possível encomendar uma obra personalizada?",
    a: "Sim, a artista aceita encomendas para obras personalizadas. Entre em contato para discutir detalhes, prazos e valores."
  },
  {
    q: "Como são embaladas as obras para envio?",
    a: "Todas as obras são cuidadosamente embaladas com materiais de proteção específicos para garantir que cheguem em perfeito estado ao seu destino."
  }
]

const ContatoPage = () => {
  const [contacts, setContacts] = useState(null)
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', mensagem: '' })

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await api.get("/api/profile/contacts")
        setContacts(res.data)
      } catch {}
    }
    fetchContacts()
  }, [])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  return (
    <div className="min-h-screen pt-36 flex flex-col items-center justify-center px-4" style={{ background: 'linear-gradient(rgba(255,250,244,0.97), rgba(255,250,244,0.97))' }}>
      <h1 className="text-4xl font-serif font-bold text-center mb-2">Entre em Contato</h1>
      <p className="text-lg text-gray-700 text-center mb-10 max-w-2xl">
        Tem interesse em alguma obra ou gostaria de saber mais sobre o trabalho da artista? Preencha o formulário abaixo ou utilize um dos canais de contato.
      </p>
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/80 rounded-2xl shadow-xl p-8 mb-12">
        {/* Formulário */}
        <form className="space-y-6 w-full" action={`mailto:${contacts?.email || ''}`} method="POST" encType="text/plain">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="nome" value={form.nome} onChange={handleChange} placeholder="Seu nome" className="input w-full border rounded px-3 py-2" required />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="seu.email@exemplo.com" className="input w-full border rounded px-3 py-2" required />
          </div>
          <input type="text" name="assunto" value={form.assunto} onChange={handleChange} placeholder="Assunto da mensagem" className="input w-full border rounded px-3 py-2" required />
          <textarea name="mensagem" value={form.mensagem} onChange={handleChange} placeholder="Sua mensagem" className="input w-full border rounded px-3 py-2" rows={5} required />
          <button type="submit" className="btn btn-primary w-full">Enviar Mensagem</button>
        </form>
        {/* Informações de contato */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold mb-4">Informações de Contato</h2>
          {contacts ? (
            <>
              {contacts.email && (
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-green-100 p-3 rounded-full"><FaEnvelope className="text-green-700" /></span>
                  <span><b>Email:</b> <a href={`mailto:${contacts.email}`} className="hover:underline" target="_blank" rel="noopener noreferrer">{contacts.email}</a></span>
                </div>
              )}
              {contacts.instagram && (
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-pink-100 p-3 rounded-full"><FaInstagram className="text-pink-700" /></span>
                  <span><b>Instagram:</b> <a href={`https://instagram.com/${contacts.instagram.replace("@", "")}`} className="hover:underline" target="_blank" rel="noopener noreferrer">@{contacts.instagram.replace("@", "")}</a></span>
                </div>
              )}
              {contacts.whatsapp && (
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-green-100 p-3 rounded-full"><FaWhatsapp className="text-green-700" /></span>
                  <span><b>WhatsApp:</b> <a href={`https://wa.me/${contacts.whatsapp.replace(/\D/g, "")}`} className="hover:underline" target="_blank" rel="noopener noreferrer">{contacts.whatsapp}</a></span>
                </div>
              )}
              {contacts.telefone && (
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-blue-100 p-3 rounded-full"><FaPhone className="text-blue-700" /></span>
                  <span><b>Telefone:</b> <a href={`tel:${contacts.telefone.replace(/\D/g, "")}`} className="hover:underline">{contacts.telefone}</a></span>
                </div>
              )}
              {contacts.endereco && (
                <div className="flex items-center gap-4 text-lg">
                  <span className="bg-purple-100 p-3 rounded-full"><FaMapMarkerAlt className="text-purple-700" /></span>
                  <span><b>Ateliê:</b><br />{contacts.endereco.split("\n").map((l, i) => <span key={i}>{l}<br /></span>)}</span>
                </div>
              )}
            </>
          ) : <div className="text-gray-400">Carregando...</div>}
        </div>
      </div>
      {/* FAQ */}
      <div className="w-full max-w-5xl mb-20">
        <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{faq.q}</h3>
              <p className="text-gray-700 text-base">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContatoPage 