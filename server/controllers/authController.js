const pool = require("../db");
const bcrypt = require("bcrypt");

const COOKIE_NAME = "admin-auth";


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

    res.cookie(COOKIE_NAME, "true", {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ mensagem: "Login bem-sucedido", usuario: { id: usuario.id, nome: usuario.nome } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro no login" });
  }
};

// Logout
exports.logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ mensagem: "Logout realizado com sucesso" });
};

// Verificar autenticação
exports.checkAuth = (req, res) => {
  const isAuthenticated = req.cookies[COOKIE_NAME] === "true";
  res.json({ isAuthenticated });
};
