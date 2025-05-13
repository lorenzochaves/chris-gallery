require('dotenv').config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// Importa rotas
const artworkRoutes = require("./routes/artwork");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5001;

// CORS para ambiente local + produção (Vercel)
app.use(
  cors({
    origin: [
      "http://localhost:3000",              // local
      "https://chris-gallery.vercel.app",   // produção
    ],
    credentials: true,
  })
);

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use("/api/artworks", artworkRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

// Teste de saúde do servidor
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando!" });
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
