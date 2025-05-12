const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register); // 1x só
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/check-auth", authController.checkAuth);

module.exports = router;
