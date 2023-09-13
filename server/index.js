import express from "express";
import ViteExpress from "vite-express";
import session from "express-session";
import songCtrl from "./controllers/songCtrl.js";
import authCtrl from "./controllers/authCtrl.js";
const { register, login, checkUser, logout } = authCtrl;
const { getSong, getAnonSong } = songCtrl;
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: "d4612a7c82ee47f9bdc444dc9e6144d7",
  clientSecret: "53ca941dff05453c8d1d5a9305131ecc",
});

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    console.log("The access token is " + data.body["access_token"]);

    spotifyApi.setAccessToken(data.body["access_token"]);
  },
  function (err) {
    console.log(
      "Something went wrong when retrieving an access token",
      err.message
    );
  }
);

const app = express();
const PORT = 5050;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    saveUninitialized: true,
    resave: false,
    secret: "as;ldfkjas;dlkjfgasdfl;jkghjsd;kl",
    cookie: {
      maxAge: 1000 * 60 * 60 * 48,
    },
  })
);

// Endpoints here!
// auth endpoints
app.post("/register", register);
app.post("/login", login);
app.get("/checkUser", checkUser);
app.delete("/logout", logout);

app.post("/getSong", getSong);
app.post("/getAnonSong", getAnonSong);
app.put("/updateUser");

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));

export { spotifyApi };
