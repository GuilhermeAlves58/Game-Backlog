import express from "express";
import axios from "axios";
import db from "../db/pool.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM games");
        res.render("index.ejs", { games: result.rows });
    } catch (err) {
        console.log(err);
    }
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
    } catch (err) {
        console.log(err);
    }
});

router.get("/edit/:id", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM games WHERE id = $1", [req.params.id]);
        res.render("edit.ejs", { game: result.rows[0] });
    } catch (err) {
        console.log(err)
    }
});

router.post("/edit/:id", async (req, res) => {
    try {
        const { rawg_id, nome, capa, status, avaliacao, notas } = req.body;
        const id = req.params.id;
        await db.query("UPDATE games SET rawg_id=$1, nome=$2, capa_url=$3, status=$4, avaliacao=$5, notas_pessoais=$6 WHERE id=$7", [rawg_id, nome, capa, status, avaliacao, notas, id]);
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await db.query("DELETE FROM games WHERE id = $1", [id]);
        res.redirect("/")
    } catch (err) {
        console.log(err)
    }
});

export default router;