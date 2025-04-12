const AboutPage = () => {
  return (
    <div className="relative">
      {/* Background artwork elements */}
      <div className="absolute inset-0 -z-10 opacity-5">
        <div className="absolute top-20 left-10 h-64 w-64 rotate-12">
          <img src="/images/placeholder-1.jpg" alt="Arte de fundo" className="h-full w-full object-cover" />
        </div>
        <div className="absolute bottom-40 right-20 h-80 w-80 -rotate-6">
          <img src="/images/placeholder-2.jpg" alt="Arte de fundo" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="container mx-auto py-16 px-4">
        <h1 className="mb-12 text-center font-serif text-5xl font-light tracking-wide md:text-6xl">Sobre Mim</h1>

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-xl">
            <img src="/images/artist-placeholder.jpg" alt="Retrato da Artista" className="h-full w-full object-cover" />
          </div>

          <div className="flex flex-col justify-center space-y-6 font-serif">
            <h2 className="text-2xl font-medium">Nome da Artista</h2>

            <div className="space-y-4 text-lg leading-relaxed">
              <p>
                Nascida em São Paulo em 1985, minha jornada artística começou na infância, quando descobri o poder
                transformador das cores e formas. Formada em Artes Visuais pela Universidade de São Paulo, desenvolvi um
                estilo único que combina técnicas tradicionais com abordagens contemporâneas.
              </p>

              <p>
                Minha obra explora temas como identidade, memória e a relação entre o ser humano e a natureza. Através
                de pinceladas expressivas e uma paleta vibrante, busco criar experiências visuais que convidam o
                espectador a uma reflexão profunda sobre nossa existência.
              </p>

              <p>
                Ao longo dos anos, participei de exposições em galerias renomadas no Brasil e exterior. Cada obra que
                crio é uma parte de minha história, um fragmento de minha visão de mundo que compartilho com quem se
                permite mergulhar em minhas criações.
              </p>
            </div>

            <div className="pt-4">
              <div className="text-xl font-medium">Formação</div>
              <ul className="mt-2 space-y-2">
                <li>• Mestrado em Artes Visuais - Universidade de São Paulo (2010-2012)</li>
                <li>• Bacharelado em Artes Plásticas - Universidade de São Paulo (2004-2008)</li>
                <li>• Curso de Técnicas Pictóricas - Escola de Belas Artes de Paris (2009)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-4xl space-y-6 font-serif text-lg leading-relaxed">
          <h3 className="text-center text-2xl font-medium">Processo Criativo</h3>
          <p>
            Meu processo criativo começa com a observação atenta do mundo ao meu redor. Coleto impressões, sensações e
            memórias que posteriormente transformo em estudos e esboços. Trabalho principalmente com tinta acrílica e
            óleo sobre tela, mas também exploro técnicas mistas, incorporando elementos como colagem e materiais
            orgânicos.
          </p>
          <p>
            Cada obra passa por múltiplas camadas e transformações até atingir o equilíbrio visual e emocional que
            busco. Acredito que a arte tem o poder de conectar pessoas através de experiências compartilhadas, e é esse
            diálogo silencioso entre a obra e o espectador que me motiva a continuar criando.
          </p>
          <p>
            Convido você a explorar meu portfólio e descobrir as histórias que cada obra carrega consigo. Se desejar
            conhecer mais sobre meu trabalho ou adquirir uma peça, ficarei feliz em conversar.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage
