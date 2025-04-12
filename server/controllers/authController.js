// Credenciais de admin (em um app real, use um banco de dados e hash de senha)
const ADMIN_USERNAME = "admin"
const ADMIN_PASSWORD = "password123"

// Login
exports.login = (req, res) => {
  const { username, password } = req.body

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Configurar cookie de autenticação
    res.cookie("admin-auth", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 1 dia
    })

    return res.json({ success: true })
  }

  res.status(401).json({ success: false, message: "Credenciais inválidas" })
}

// Logout
exports.logout = (req, res) => {
  res.clearCookie("admin-auth")
  res.json({ success: true })
}

// Verificar autenticação
exports.checkAuth = (req, res) => {
  const isAuthenticated = req.cookies["admin-auth"] === "true"
  res.json({ isAuthenticated })
}
