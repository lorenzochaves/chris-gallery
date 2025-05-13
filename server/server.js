require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// Importa rotas
const artworkRoutes = require("./routes/artwork");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:3000", "https://chris-gallery.vercel.app"], // URL do seu frontend React
    credentials: true, // Necessário para usar cookies
  })
);

app.use(express.json()); // Para ler JSON
app.use(cookieParser()); // Para ler cookies (autenticação)
app.use(express.urlencoded({ extended: true })); // Para formulários

// Servir arquivos estáticos do React em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

// Rotas da API
app.use("/api/artworks", artworkRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Teste de saúde do servidor
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando!" });
});

// Rota para servir o React em produção
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
