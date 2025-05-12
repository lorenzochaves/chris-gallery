const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artworkController");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../upload");

// Rotas públicas
router.get("/", artworkController.getAllArtworks);
router.get("/:id(\\d+)", artworkController.getArtworkById);
router.get("/category/:categoryId", artworkController.getArtworksByCategory);

// Rotas protegidas (com autenticação e upload)
router.post(
  "/",
  isAuthenticated,
  upload.fields([
    { name: "imagem_principal", maxCount: 1 },
    { name: "imagens_adicionais", maxCount: 10 },
  ]),
  artworkController.createArtwork
);

router.put(
  "/:id",
  isAuthenticated,
  upload.fields([
    { name: "imagem_principal", maxCount: 1 },
    { name: "imagens_adicionais", maxCount: 10 },
  ]),
  artworkController.updateArtwork
);
router.delete("/:id", isAuthenticated, artworkController.deleteArtwork);

router.post("/delete-additional-image", isAuthenticated, artworkController.deleteAdditionalImage);

module.exports = router;
