import express from "express";
import axios from "axios";


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

router.post("/add", (req, res) => {

});

router.get("/edit/:id", (req, res) => {

});

router.post("/edit/:d", (req, res) => {

});

router.delete("/delete/:id", (req, res) => {

});

export default router;