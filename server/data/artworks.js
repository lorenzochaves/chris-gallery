// Dados simulados para obras de arte
const artworks = [
  {
    id: "1",
    title: "Paisagem Abstrata",
    description: "Uma interpretação abstrata de uma paisagem natural, com cores vibrantes e texturas expressivas.",
    image: "/images/placeholder-1.jpg",
    additionalImages: [
      "/images/placeholder-detail-1.jpg",
      "/images/placeholder-detail-2.jpg",
      "/images/placeholder-detail-3.jpg",
    ],
    price: 1200,
    available: true,
    dimensions: "60 x 80 cm",
    technique: "Acrílica sobre tela",
    createdAt: "2023-05-15T00:00:00.000Z",
    categoryIds: ["1", "4"], // Pinturas, Abstratos
  },
  {
    id: "2",
    title: "Retrato Contemporâneo",
    description: "Um retrato contemporâneo que explora a identidade e emoção através de pinceladas expressivas.",
    image: "/images/placeholder-2.jpg",
    additionalImages: ["/images/placeholder-detail-4.jpg", "/images/placeholder-detail-5.jpg"],
    price: 1500,
    available: true,
    dimensions: "50 x 70 cm",
    technique: "Óleo sobre tela",
    createdAt: "2023-08-22T00:00:00.000Z",
    categoryIds: ["1"], // Pinturas
  },
  {
    id: "3",
    title: "Composição Geométrica",
    description: "Uma composição geométrica que explora formas e cores em um arranjo harmonioso e equilibrado.",
    image: "/images/placeholder-3.jpg",
    additionalImages: [],
    price: null,
    available: false,
    dimensions: "40 x 40 cm",
    technique: "Técnica mista",
    createdAt: "2023-11-10T00:00:00.000Z",
    categoryIds: ["4"], // Abstratos
  },
  {
    id: "4",
    title: "Natureza Morta",
    description: "Uma natureza morta contemporânea que explora a relação entre objetos cotidianos e sua simbologia.",
    image: "/images/placeholder-4.jpg",
    additionalImages: ["/images/placeholder-detail-6.jpg"],
    price: 900,
    available: true,
    dimensions: "30 x 40 cm",
    technique: "Aquarela",
    createdAt: "2024-01-05T00:00:00.000Z",
    categoryIds: ["1"], // Pinturas
  },
  {
    id: "5",
    title: "Jarro Decorativo",
    description: "Um jarro decorativo feito à mão com técnicas tradicionais de cerâmica.",
    image: "/images/placeholder-5.jpg",
    additionalImages: ["/images/placeholder-detail-7.jpg", "/images/placeholder-detail-8.jpg"],
    price: 450,
    available: true,
    dimensions: "25 x 15 cm",
    technique: "Cerâmica esmaltada",
    createdAt: "2023-09-18T00:00:00.000Z",
    categoryIds: ["3"], // Jarros
  },
  {
    id: "6",
    title: "Escultura Moderna",
    description: "Uma escultura moderna que explora a relação entre espaço e forma.",
    image: "/images/placeholder-6.jpg",
    additionalImages: ["/images/placeholder-detail-9.jpg", "/images/placeholder-detail-10.jpg"],
    price: 2200,
    available: true,
    dimensions: "45 x 20 x 20 cm",
    technique: "Bronze fundido",
    createdAt: "2022-11-05T00:00:00.000Z",
    categoryIds: ["2"], // Esculturas
  },
]

module.exports = artworks
