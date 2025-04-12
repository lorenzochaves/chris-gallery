// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
  if (req.cookies["admin-auth"] === "true") {
    return next()
  }

  res.status(401).json({ message: "Não autorizado" })
}
