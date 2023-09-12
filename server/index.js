import express from "express";
import ViteExpress from "vite-express";
import ctrl from "./controller.js";
const { addUser } = ctrl;

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Endpoints here!
app.get("/getSong");
app.post("/addUser", addUser);
app.put("/updateUser");

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));
