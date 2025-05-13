require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const artworkRoutes = require("./routes/artwork");
const categoryRoutes = require("./routes/category");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://chris-gallery.vercel.app"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"],
    exposedHeaders: ["Set-Cookie"],
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/api/artworks", artworkRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Servidor funcionando!" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
