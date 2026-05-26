import express from "express";
import axios from "axios";
import "dotenv/config";
import gameRoutes from "./routes/games.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", gameRoutes);

app.listen(port, () => {
  console.log(`"Hello World! port ${port}`);
});