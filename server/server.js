require('dotenv').config();
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")
const artworkRoutes = require("./routes/artwork")
const categoryRoutes = require("./routes/category")
const authRoutes = require("./routes/auth")

const app = express()
const PORT = process.env.PORT || 5001

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
)
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

// Servir arquivos estáticos em produção
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")))
}

// Rotas da API
app.use("/api/artworks", artworkRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/auth", authRoutes)

// Rota para verificar se o servidor está funcionando
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando!" })
})

// Rota para servir o React app em produção
if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
  })
}

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
