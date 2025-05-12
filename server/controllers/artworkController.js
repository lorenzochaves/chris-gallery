const pool = require('../db');

// GET todas as obras
exports.getAllArtworks = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        o.id,
        o.titulo as title,
        o.descricao as description,
        o.imagem_principal as image,
        o.preco as price,
        o.disponivel as available,
        o.dimensoes as dimensions,
        o.tecnica as technique,
        o.tipo_arquivo as file_type,
        o.artista as artist,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT ai.url), NULL) AS "additionalImages",
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT oc.categoria_id), NULL) AS "categoryIds"
      FROM obras o
      LEFT JOIN obras_imagens_adicionais ai ON ai.obra_id = o.id
      LEFT JOIN obras_categorias oc ON oc.obra_id = o.id
      GROUP BY o.id
      ORDER BY o.id DESC
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar obras' });
  }
};

// GET obra por ID
exports.getArtworkById = async (req, res) => {
  const id = Number(req.params.id);
  if (isNaN(id)) {
    return res.status(400).json({ erro: "ID inválido" });
  }

  try {
    const obra = await pool.query(`
      SELECT 
        o.id,
        o.titulo as title,
        o.descricao as description,
        o.imagem_principal as image,
        o.preco as price,
        o.disponivel as available,
        o.dimensoes as dimensions,
        o.tecnica as technique,
        o.tipo_arquivo as file_type,
        o.artista as artist,
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT ai.url), NULL) AS "additionalImages",
        ARRAY_REMOVE(ARRAY_AGG(DISTINCT oc.categoria_id), NULL) AS "categoryIds"
      FROM obras o
      LEFT JOIN obras_imagens_adicionais ai ON ai.obra_id = o.id
      LEFT JOIN obras_categorias oc ON oc.obra_id = o.id
      WHERE o.id = $1
      GROUP BY o.id
    `, [id]);

    if (obra.rows.length === 0) {
      return res.status(404).json({ erro: 'Obra não encontrada' });
    }

    res.json(obra.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar obra' });
  }
};

// GET por categoria
exports.getArtworksByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const result = await pool.query(`
      SELECT o.id,
             o.titulo as title,
             o.descricao as description,
             o.imagem_principal as image,
             o.preco as price,
             o.disponivel as available,
             o.dimensoes as dimensions,
             o.tecnica as technique,
             o.tipo_arquivo as file_type,
             o.artista as artist,
             ARRAY_REMOVE(ARRAY_AGG(DISTINCT ai.url), NULL) AS "additionalImages",
             ARRAY_REMOVE(ARRAY_AGG(DISTINCT oc.categoria_id), NULL) AS "categoryIds"
      FROM obras o
      LEFT JOIN obras_imagens_adicionais ai ON ai.obra_id = o.id
      LEFT JOIN obras_categorias oc ON oc.obra_id = o.id
      WHERE o.id IN (
        SELECT obra_id FROM obras_categorias WHERE categoria_id = $1
      )
      GROUP BY o.id
      ORDER BY o.id DESC
    `, [categoryId]);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar por categoria' });
  }
};

// POST nova obra
exports.createArtwork = async (req, res) => {
  const {
    title,
    description,
    price,
    available,
    dimensions,
    technique,
    categoryIds,
    artista,
    usuario_id,
  } = req.body;

  const mainFile = req.files?.imagem_principal?.[0];
  const adicionais = req.files?.imagens_adicionais || [];

  if (!mainFile) return res.status(400).json({ erro: 'imagem_principal obrigatória' });

  const tipo_arquivo = mainFile.mimetype.startsWith('video') ? 'video' : 'imagem';
  const url_principal = mainFile.location;

  try {
    const obraResult = await pool.query(
      `INSERT INTO obras 
      (titulo, descricao, imagem_principal, preco, disponivel, dimensoes, tecnica, tipo_arquivo, artista, usuario_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
      RETURNING id`,
      [
        title,
        description,
        url_principal,
        price || null,
        available === 'true' || available === true,
        dimensions,
        technique,
        tipo_arquivo,
        artista,
        usuario_id,
      ]
    );

    const obraId = obraResult.rows[0].id;

    // Agora sim, insere as imagens adicionais
    for (let img of adicionais) {
      await pool.query(
        'INSERT INTO obras_imagens_adicionais (obra_id, url) VALUES ($1, $2)',
        [obraId, img.location]
      );
    }

    if (categoryIds) {
      await pool.query('DELETE FROM obras_categorias WHERE obra_id = $1', [obraId]);

      // Remover duplicatas
      const cats = Array.isArray(categoryIds) ? [...new Set(categoryIds)] : [categoryIds];
      for (let catId of cats) {
        await pool.query(
          'INSERT INTO obras_categorias (obra_id, categoria_id) VALUES ($1, $2)',
          [obraId, catId]
        );
      }
    }

    res.status(201).json({ id: obraId, mensagem: 'Obra criada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar obra' });
  }
};

// PUT atualizar obra
exports.updateArtwork = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    available,
    dimensions,
    technique,
    categoryIds,
    artista,
  } = req.body;

  const mainFile = req.files?.imagem_principal?.[0];
  const adicionais = req.files?.imagens_adicionais || [];

  let url_principal = null;
  if (mainFile) {
    url_principal = mainFile.location;
  }

  try {
    const result = await pool.query('SELECT * FROM obras WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Obra não encontrada' });
    }

    await pool.query(
      `UPDATE obras SET
        titulo = $1,
        descricao = $2,
        preco = $3,
        disponivel = $4,
        dimensoes = $5,
        tecnica = $6,
        artista = $7
        ${url_principal ? ', imagem_principal = $9' : ''}
      WHERE id = $8`,
      [
        title,
        description,
        price || null,
        available === 'true' || available === true,
        dimensions,
        technique,
        artista,
        id,
        ...(url_principal ? [url_principal] : []),
      ]
    );

    // Apenas insira as novas, se houver:
    if (adicionais.length > 0) {
      for (let img of adicionais) {
        await pool.query(
          'INSERT INTO obras_imagens_adicionais (obra_id, url) VALUES ($1, $2)',
          [id, img.location]
        );
      }
    }

    if (categoryIds) {
      await pool.query('DELETE FROM obras_categorias WHERE obra_id = $1', [id]);
      const cats = Array.isArray(categoryIds) ? [...new Set(categoryIds)] : [categoryIds];
      for (let catId of cats) {
        await pool.query(
          'INSERT INTO obras_categorias (obra_id, categoria_id) VALUES ($1, $2)',
          [id, catId]
        );
      }
    }

    res.json({ mensagem: 'Obra atualizada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar obra' });
  }
};

// DELETE obra
exports.deleteArtwork = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM obras WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Obra não encontrada' });
    }

    await pool.query('DELETE FROM obras WHERE id = $1', [id]);
    res.json({ mensagem: 'Obra deletada com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar obra' });
  }
};

// DELETE uma imagem adicional
exports.deleteAdditionalImage = async (req, res) => {
  const { obraId, imageUrl } = req.body;
  try {
    await pool.query(
      'DELETE FROM obras_imagens_adicionais WHERE obra_id = $1 AND url = $2',
      [obraId, imageUrl]
    );
    // Optionally: also delete from S3 here if you want
    res.json({ mensagem: 'Imagem adicional removida com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover imagem adicional' });
  }
};
