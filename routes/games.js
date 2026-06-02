import express from "express";
import axios from "axios";
import db from "../db/pool.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index.ejs");
});

router.get("/search", async (req, res) => {
    try {
        const game = req.query.q;
        const data = await axios.get(`https://api.rawg.io/api/games?search=${game}&key=${process.env.RAWG_API_KEY}`);
        res.json(data.data);
    } catch (err) {
        console.log(err);
    }
});

router.post("/add", async (req, res) => {
    try {
        const { rawg_id, nome, capa, status, avaliacao, notas } = req.body;
        await db.query(
            "INSERT INTO games (rawg_id, nome, capa_url, status, avaliacao, notas_pessoais) VALUES ($1, $2, $3, $4, $5, $6)",
            [rawg_id, nome, capa, status, avaliacao, notas]
        );
        res.redirect("/");
    } catch(err) {
        console.log(err);
    }
});

router.get("/edit/:id", (req, res) => {

});

router.post("/edit/:id", (req, res) => {

});

router.delete("/delete/:id", (req, res) => {

});

export default router;