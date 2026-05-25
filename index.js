import express from "express";
import axios from "axios";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`"Hello World! port ${port}`);
});