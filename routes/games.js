import express from "express";
import axios from "axios";
import db from "../db/pool.js";
 
const router = express.Router();
 
// GET / — Lista todos os jogos da biblioteca com ordenação
router.get("/", async (req, res) => {
    try{
    // Pega o tipo de ordenação da URL (?ordenacao=nome) ou usa "nome" como padrão
    const order = req.query.ordenacao || "nome";
 
    // Valida o valor recebido para evitar SQL injection
    const validOrders = ["nome", "status", "avaliacao"];
    const column = validOrders.includes(order) ? order : "nome";
 
    const result = await db.query(`SELECT * FROM games ORDER BY ${column} ASC`);
 
    // Passa os jogos e o tipo de ordenação atual para a view
    res.render("index.ejs", { games: result.rows, query: order });
    } catch (err){
        console.log(err);   
    }
 
});
 
// GET /search — Busca jogos na RAWG API pelo nome
router.get("/search", async (req, res) => {
    try {
        const game = req.query.q; // Termo de busca vindo da URL (?q=...)
        const data = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${process.env.RAWG_API_KEY}`);
        res.json(data.data); // Retorna o JSON da RAWG para o cliente
    } catch (err) {
        console.log(err);
    }
});
 
// POST /add — Salva um novo jogo no banco
router.post("/add", async (req, res) => {
    try {
        const { rawg_id, nome, capa, status, notas } = req.body;
 
        // Converte avaliacao para número — formulários enviam tudo como string
        const avaliacao = parseInt(req.body.avaliacao) || 0;
 
        await db.query(
            "INSERT INTO games (rawg_id, nome, capa_url, status, avaliacao, notas_pessoais) VALUES ($1, $2, $3, $4, $5, $6)",
            [rawg_id, nome, capa, status, avaliacao, notas]
        );
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});
 
// GET /edit/:id — Busca o jogo pelo id e exibe o formulário de edição
router.get("/edit/:id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM games WHERE id = $1", [req.params.id]);
        res.render("edit.ejs", { game: result.rows[0] }); // Passa o jogo para a view
    } catch (err) {
        console.log(err);
    }
});
 
// POST /edit/:id — Atualiza os dados do jogo no banco
router.post("/edit/:id", async (req, res) => {
    try {
        const { rawg_id, nome, capa, status, avaliacao, notas } = req.body;
        const id = req.params.id;
        await db.query(
            "UPDATE games SET rawg_id=$1, nome=$2, capa_url=$3, status=$4, avaliacao=$5, notas_pessoais=$6 WHERE id=$7",
            [rawg_id, nome, capa, status, avaliacao, notas, id]
        );
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});
 
// POST /delete/:id — Remove o jogo do banco pelo id
// Usa POST em vez de DELETE pois formulários HTML não suportam o método DELETE
router.post("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM games WHERE id = $1", [id]);
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
});
 
export default router;