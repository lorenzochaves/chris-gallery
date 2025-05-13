// Middleware para verificar se o usuário está autenticado
exports.isAuthenticated = (req, res, next) => {
  try {
    const authCookie = req.cookies["admin-auth"];
    
    if (!authCookie) {
      return res.status(401).json({ message: "Não autorizado - Cookie não encontrado" });
    }

    if (authCookie === "true") {
      return next();
    }

    return res.status(401).json({ message: "Não autorizado - Cookie inválido" });
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(500).json({ message: "Erro interno na autenticação" });
  }
}
