const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { isAuthenticated } = require("../middleware/auth")

router.post("/login", authController.login)
router.post("/logout", authController.logout)
router.get("/check", authController.checkAuth)

module.exports = router
