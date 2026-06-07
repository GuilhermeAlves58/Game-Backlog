import express from "express";
import axios from "axios";
import "dotenv/config"; // Carrega as variáveis do arquivo .env (DB_HOST, PORT, etc.)
import gameRoutes from "./routes/games.js";
 
const app = express();
const port = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão
 
// Serve os arquivos estáticos da pasta public (CSS, JS do cliente)
app.use(express.static("public"));
 
// Permite ler dados enviados via formulários HTML
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Define EJS como motor de templates
app.set("view engine", "ejs");
 
// Registra as rotas do jogo na raiz "/"
app.use("/", gameRoutes);
 
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
 