import express from "express";
import ViteExpress from "vite-express";
import songCtrl from "./controllers/songCtrl.js";
import authCtrl from "./controllers/authCtrl.js";
const { register, login, checkUser, logout } = authCtrl;

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Endpoints here!
// auth endpoints
app.post("/register", register);
app.post("/login", login);
app.get("/checkUser", checkUser);
app.delete("/logout", logout);

app.get("/getSong");
app.put("/updateUser");

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));
