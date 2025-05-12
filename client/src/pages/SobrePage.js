import React from "react"

const SobrePage = () => {
  return (
    <div className="min-h-screen bg-white pt-36">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-4xl font-serif font-bold mb-8 text-center">Sobre o Artista</h1>
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="w-full md:w-1/2">
            <img
              src="/path/to/artist-image.jpg"
              alt="Chris Fontenelle"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <p className="text-lg text-gray-700 mb-4">
              Chris Fontenelle é um artista contemporâneo cujo trabalho explora as interseções entre tradição e inovação, criando peças que desafiam e inspiram.
            </p>
            <p className="text-lg text-gray-700">
              Sua trajetória é marcada por exposições nacionais e internacionais, sempre buscando novas formas de expressão e conexão com o público.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SobrePage 