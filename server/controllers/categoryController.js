const pool = require("../db");

// Buscar todas as categorias
exports.getAllCategories = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categorias ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar categorias" });
  }
};

// Buscar categoria por ID
exports.getCategoryById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: "Categoria não encontrada" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao buscar categoria" });
  }
};

// Criar nova categoria
exports.createCategory = async (req, res) => {
  const { name, slug } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO categorias (nome, slug) VALUES ($1, $2) RETURNING *",
      [name, slug || name.toLowerCase().replace(/\s+/g, "-")]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao criar categoria" });
  }
};

// Atualizar categoria
exports.updateCategory = async (req, res) => {
  const { name, slug } = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query("SELECT * FROM categorias WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: "Categoria não encontrada" });

    const updated = await pool.query(
      `UPDATE categorias SET nome = $1, slug = $2 WHERE id = $3 RETURNING *`,
      [name, slug || name.toLowerCase().replace(/\s+/g, "-"), id]
    );
    res.json(updated.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao atualizar categoria" });
  }
};

// Deletar categoria
exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM obras_categorias WHERE categoria_id = $1", [id]);
    await pool.query("DELETE FROM categorias WHERE id = $1", [id]);
    res.json({ mensagem: "Categoria deletada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: "Erro ao deletar categoria" });
  }
};
