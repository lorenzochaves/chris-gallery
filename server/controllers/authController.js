const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "sua-chave-secreta-temporaria";


// Login real
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ erro: "Usuário não encontrado" });
    }

    const usuario = result.rows[0];
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha_hash);

    if (!senhaCorreta) {
      return res.status(401).json({ erro: "Senha incorreta" });
    }

    // Criar token JWT
    const token = jwt.sign(
      { 
        id: usuario.id,
        email: usuario.email,
        nome: usuario.nome
      },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({ 
      mensagem: "Login bem-sucedido", 
      usuario: { 
        id: usuario.id, 
        nome: usuario.nome,
        email: usuario.email
      },
      token
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no login" });
  }
};

// Logout (não é necessário com JWT, mas mantemos para compatibilidade)
exports.logout = (req, res) => {
  res.json({ mensagem: "Logout realizado com sucesso" });
};

// Verificar autenticação
exports.checkAuth = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.json({ isAuthenticated: false });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ 
      isAuthenticated: true,
      usuario: {
        id: decoded.id,
        nome: decoded.nome,
        email: decoded.email
      }
    });
  } catch (err) {
    res.json({ isAuthenticated: false });
  }
};
