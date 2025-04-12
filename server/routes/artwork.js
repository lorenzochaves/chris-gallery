const express = require("express")
const router = express.Router()
const artworkController = require("../controllers/artworkController")
const { isAuthenticated } = require("../middleware/auth")

// Rotas públicas
router.get("/", artworkController.getAllArtworks)
router.get("/:id", artworkController.getArtworkById)
router.get("/category/:categoryId", artworkController.getArtworksByCategory)

// Rotas protegidas (requerem autenticação)
router.post("/", isAuthenticated, artworkController.createArtwork)
router.put("/:id", isAuthenticated, artworkController.updateArtwork)
router.delete("/:id", isAuthenticated, artworkController.deleteArtwork)

module.exports = router
