const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta-temporaria";

exports.isAuthenticated = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      console.log('Token não encontrado nos headers');
      return res.status(401).json({ message: "Não autorizado - Token não encontrado" });
    }

    const token = authHeader.split(' ')[1];
    
    if (!token) {
      console.log('Formato do token inválido');
      return res.status(401).json({ message: "Não autorizado - Formato do token inválido" });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.usuario = decoded; // Adiciona as informações do usuário ao request
      console.log('Token válido, autenticação bem-sucedida');
      return next();
    } catch (err) {
      console.log('Token inválido:', err.message);
      return res.status(401).json({ message: "Não autorizado - Token inválido" });
    }
  } catch (error) {
    console.error("Erro na autenticação:", error);
    return res.status(500).json({ message: "Erro interno na autenticação" });
  }
}