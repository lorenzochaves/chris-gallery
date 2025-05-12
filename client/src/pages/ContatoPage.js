import React from "react"

const ContatoPage = () => {
  return (
    <div className="min-h-screen bg-white pt-36">
      <div className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-serif font-bold mb-8 text-center">Contato</h1>
        <p className="text-lg text-gray-700 mb-8 text-center">
          Entre em contato para adquirir uma obra, tirar dúvidas ou agendar uma visita ao ateliê.
        </p>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-2xl">📧</span>
            <span className="text-lg">email@exemplo.com</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📱</span>
            <span className="text-lg">(99) 99999-9999</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">📸</span>
            <span className="text-lg">@instagram</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl">💬</span>
            <span className="text-lg">WhatsApp: (99) 99999-9999</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContatoPage 