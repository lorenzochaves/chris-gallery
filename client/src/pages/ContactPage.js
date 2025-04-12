const ContactPage = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="mb-8 text-3xl font-bold">Contato</h1>

      <div className="mx-auto max-w-2xl space-y-8">
        <p className="text-lg text-gray-500">Entre em contato através de um dos canais abaixo:</p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex flex-col items-center rounded-lg border p-6 text-center">
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
              className="mb-4 h-8 w-8"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <h2 className="mb-2 text-xl font-medium">WhatsApp</h2>
            <p className="mb-4 text-gray-500">(00) 00000-0000</p>
            <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Enviar mensagem
            </a>
          </div>

          <div className="flex flex-col items-center rounded-lg border p-6 text-center">
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
              className="mb-4 h-8 w-8"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <h2 className="mb-2 text-xl font-medium">Email</h2>
            <p className="mb-4 text-gray-500">contato@galeriadearte.com</p>
            <a href="mailto:contato@galeriadearte.com" className="btn btn-outline">
              Enviar email
            </a>
          </div>

          <div className="flex flex-col items-center rounded-lg border p-6 text-center sm:col-span-2">
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
              className="mb-4 h-8 w-8"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
            <h2 className="mb-2 text-xl font-medium">Instagram</h2>
            <p className="mb-4 text-gray-500">@galeriadearte</p>
            <a
              href="https://instagram.com/galeriadearte"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline"
            >
              Seguir
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage
