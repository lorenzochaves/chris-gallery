exports.isAuthenticated = (req, res, next) => {
  try {
    console.log('Cookies recebidos:', req.cookies);
    const authCookie = req.cookies["admin-auth"];
    
    if (!authCookie) {
      console.log('Cookie não encontrado');
      return res.status(401).json({ message: "Não autorizado - Cookie não encontrado" });
    }

    if (authCookie === "true") {
      console.log('Cookie válido, autenticação bem-sucedida');
      return next();
    }

    console.log('Cookie inválido:', authCookie);
    return res.status(401).json({ message: "Não autorizado - Cookie inválido" });
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(500).json({ message: "Erro interno na autenticação" });
  }
}