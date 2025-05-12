const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { isAuthenticated } = require("../middleware/auth");
const upload = require("../upload");

// Perfil (nome, bio)
router.get("/", profileController.getProfile);
router.put("/", isAuthenticated, profileController.updateProfile);

// Imagens do perfil
router.get("/images", profileController.getProfileImages);
router.post("/images", isAuthenticated, upload.single("imagem"), profileController.addProfileImage);
router.delete("/images/:id", isAuthenticated, profileController.deleteProfileImage);

// Contatos
router.get("/contacts", profileController.getContacts);
router.put("/contacts", isAuthenticated, profileController.updateContacts);

// Homepage Carrossel
router.get("/homepage-carrossel", profileController.getHomepageCarrossel);
router.post("/homepage-carrossel", isAuthenticated, upload.single("imagem"), profileController.addHomepageCarrosselImage);
router.delete("/homepage-carrossel/:id", isAuthenticated, profileController.deleteHomepageCarrosselImage);

module.exports = router;