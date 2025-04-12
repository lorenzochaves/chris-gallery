const artworks = require("../data/artworks")
const { v4: uuidv4 } = require("uuid")

// Obter todas as obras
exports.getAllArtworks = (req, res) => {
  res.json(artworks)
}

// Obter obra por ID
exports.getArtworkById = (req, res) => {
  const artwork = artworks.find((a) => a.id === req.params.id)

  if (!artwork) {
    return res.status(404).json({ message: "Obra não encontrada" })
  }

  res.json(artwork)
}

// Obter obras por categoria
exports.getArtworksByCategory = (req, res) => {
  const { categoryId } = req.params
  const filteredArtworks = artworks.filter((artwork) => artwork.categoryIds.includes(categoryId))

  res.json(filteredArtworks)
}

// Criar nova obra
exports.createArtwork = (req, res) => {
  const { title, description, image, price, available, dimensions, technique, categoryIds } = req.body

  const newArtwork = {
    id: uuidv4(),
    title,
    description,
    image: image || "/images/placeholder.jpg",
    additionalImages: [],
    price: price ? Number(price) : null,
    available: Boolean(available),
    dimensions,
    technique,
    createdAt: new Date().toISOString(),
    categoryIds: categoryIds || [],
  }

  artworks.push(newArtwork)
  res.status(201).json(newArtwork)
}

// Atualizar obra
exports.updateArtwork = (req, res) => {
  const { title, description, image, price, available, dimensions, technique, categoryIds } = req.body

  const index = artworks.findIndex((a) => a.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ message: "Obra não encontrada" })
  }

  const updatedArtwork = {
    ...artworks[index],
    title: title || artworks[index].title,
    description: description || artworks[index].description,
    image: image || artworks[index].image,
    price: price !== undefined ? Number(price) : artworks[index].price,
    available: available !== undefined ? Boolean(available) : artworks[index].available,
    dimensions: dimensions || artworks[index].dimensions,
    technique: technique || artworks[index].technique,
    categoryIds: categoryIds || artworks[index].categoryIds,
  }

  artworks[index] = updatedArtwork
  res.json(updatedArtwork)
}

// Excluir obra
exports.deleteArtwork = (req, res) => {
  const index = artworks.findIndex((a) => a.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ message: "Obra não encontrada" })
  }

  artworks.splice(index, 1)
  res.json({ message: "Obra excluída com sucesso" })
}
