import express from "express";
import ViteExpress from "vite-express";
import controller from "./controller.js";

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Endpoints here!
app.get("/api/getSong");
app.post("/api/addUser");
app.put("/api/updateUser");

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));
