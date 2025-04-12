const categories = require("../data/categories")
let artworks = require("../data/artworks")
const { v4: uuidv4 } = require("uuid")

// Obter todas as categorias
exports.getAllCategories = (req, res) => {
  res.json(categories)
}

// Obter categoria por ID
exports.getCategoryById = (req, res) => {
  const category = categories.find((c) => c.id === req.params.id)

  if (!category) {
    return res.status(404).json({ message: "Categoria não encontrada" })
  }

  res.json(category)
}

// Criar nova categoria
exports.createCategory = (req, res) => {
  const { name, slug } = req.body

  const newCategory = {
    id: uuidv4(),
    name,
    slug: slug || name.toLowerCase().replace(/\s+/g, "-"),
  }

  categories.push(newCategory)
  res.status(201).json(newCategory)
}

// Atualizar categoria
exports.updateCategory = (req, res) => {
  const { name, slug } = req.body

  const index = categories.findIndex((c) => c.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" })
  }

  const updatedCategory = {
    ...categories[index],
    name: name || categories[index].name,
    slug: slug || (name ? name.toLowerCase().replace(/\s+/g, "-") : categories[index].slug),
  }

  categories[index] = updatedCategory
  res.json(updatedCategory)
}

// Excluir categoria
exports.deleteCategory = (req, res) => {
  const index = categories.findIndex((c) => c.id === req.params.id)

  if (index === -1) {
    return res.status(404).json({ message: "Categoria não encontrada" })
  }

  const categoryId = categories[index].id

  // Remover a categoria
  categories.splice(index, 1)

  // Remover a categoria de todas as obras
  artworks = artworks.map((artwork) => ({
    ...artwork,
    categoryIds: artwork.categoryIds.filter((id) => id !== categoryId),
  }))

  res.json({ message: "Categoria excluída com sucesso" })
}
