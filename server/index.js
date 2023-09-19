import express from "express";
import ViteExpress from "vite-express";
import session from "express-session";
import songCtrl from "./controllers/songCtrl.js";
import authCtrl from "./controllers/authCtrl.js";
const { register, login, checkUser, logout, updateUser } = authCtrl;
const { getSong, getAnonSong, spotifyAuth } = songCtrl;
import SpotifyWebApi from "spotify-web-api-node";
import { configDotenv } from "dotenv";

configDotenv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const scopes = ["user-read-email", "streaming", "user-read-private"];

var spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:5050/callback",
  clientId,
  clientSecret,
});

// spotifyApi.clientCredentialsGrant().then(
//   function (data) {
//     console.log("The access token expires in " + data.body["expires_in"]);
//     // console.log("The access token is " + data.body["access_token"]);

//     spotifyApi.setAccessToken(data.body["access_token"]);
//   },
//   function (err) {
//     console.log(
//       "Something went wrong when retrieving an access token",
//       err.message
//     );
//   }
// );

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
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/checkUser", checkUser);
app.delete("/api/logout", logout);
app.put("/api/updateUser", updateUser);

app.post("/api/getSong", getSong);
app.post("/api/getAnonSong", getAnonSong);
app.get("/api/getToken", (req, res) => {
  res.send(spotifyApi.getAccessToken());
});
app.get("/callback", function (req, res) {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error("Callback error:", error);
    res.send(`Callback Error:, ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      const access_token = data.body["access_token"];
      const refresh_token = data.body["refresh_token"];
      const expires_in = data.body["expires_in"];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log("access token:", access_token);
      console.log("refresh token:", refresh_token);

      console.log(
        "Successfully retrieved Access token. expires in:",
        expires_in
      );
      res.redirect("/");

      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body["access_token"];

        console.log("the access token has been refreshed");
        console.log("access token:", access_token);
        spotifyApi.setAccessToken(access_token);
      }, (expires_in / 2) * 1000);
    })
    .catch((err) => {
      console.log("error getting tokens", err);
      res.send("error getting tokens", err);
    });
});
app.get("/login", (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));

export { spotifyApi };
