const pool = require("../db");

// GET perfil (nome, bio)
exports.getProfile = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM perfil LIMIT 1");
    if (result.rows.length === 0) return res.status(404).json({ erro: "Perfil não encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar perfil" });
  }
};

// PUT perfil (nome, bio, subtitulo)
exports.updateProfile = async (req, res) => {
  const { nome, bio, subtitulo } = req.body;
  try {
    const result = await pool.query(
      `UPDATE perfil SET nome = $1, bio = $2, subtitulo = $3 WHERE id = 1 RETURNING *`,
      [nome, bio, subtitulo]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar perfil" });
  }
};

// GET imagens do perfil
exports.getProfileImages = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM perfil_imagens WHERE perfil_id = 1 ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar imagens do perfil" });
  }
};

// POST nova imagem do perfil
exports.addProfileImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ erro: "Arquivo obrigatório" });
  try {
    const result = await pool.query(
      "INSERT INTO perfil_imagens (perfil_id, url) VALUES (1, $1) RETURNING *",
      [req.file.location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao adicionar imagem" });
  }
};

// DELETE imagem do perfil
exports.deleteProfileImage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM perfil_imagens WHERE id = $1 AND perfil_id = 1", [id]);
    res.json({ mensagem: "Imagem removida" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover imagem" });
  }
};

// GET contatos
exports.getContacts = async (req, res) => {
  try {
    const result = await pool.query("SELECT email, instagram, whatsapp, telefone FROM perfil WHERE id = 1");
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar contatos" });
  }
};

// PUT contatos
exports.updateContacts = async (req, res) => {
  const { email, instagram, whatsapp, telefone } = req.body;
  try {
    const result = await pool.query(
      `UPDATE perfil SET email = $1, instagram = $2, whatsapp = $3, telefone = $4 WHERE id = 1 RETURNING *`,
      [email, instagram, whatsapp, telefone]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao atualizar contatos" });
  }
};

// --- Homepage Carrossel ---

// GET imagens do carrossel da homepage
exports.getHomepageCarrossel = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM homepage_carrossel ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao buscar imagens do carrossel" });
  }
};

// POST nova imagem no carrossel da homepage
exports.addHomepageCarrosselImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ erro: "Arquivo obrigatório" });
  // Limite de 5 imagens
  const countRes = await pool.query("SELECT COUNT(*) FROM homepage_carrossel");
  if (parseInt(countRes.rows[0].count) >= 5) {
    return res.status(400).json({ erro: "Limite de 5 imagens atingido" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO homepage_carrossel (url) VALUES ($1) RETURNING *",
      [req.file.location]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: "Erro ao adicionar imagem" });
  }
};

// DELETE imagem do carrossel da homepage
exports.deleteHomepageCarrosselImage = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM homepage_carrossel WHERE id = $1", [id]);
    res.json({ mensagem: "Imagem removida" });
  } catch (err) {
    res.status(500).json({ erro: "Erro ao remover imagem" });
  }
};