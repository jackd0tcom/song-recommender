import express from "express";
import ViteExpress from "vite-express";
import session from "express-session";
import songCtrl from "./controllers/songCtrl.js";
import authCtrl from "./controllers/authCtrl.js";
import userCtrl from "./controllers/userCtrl.js";
const { addSong, getAllSongs } = userCtrl;
const { register, login, checkUser, logout, updateUser } = authCtrl;
const { getSong, getAnonSong, spotifyAuth } = songCtrl;
import SpotifyWebApi from "spotify-web-api-node";
import { configDotenv } from "dotenv";

configDotenv();

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const spotify_redirectUri = "http://localhost:5050/callback";

const scopes = ["user-read-email", "streaming", "user-read-private"];

var spotifyApi = new SpotifyWebApi({
  redirectUri: "http://localhost:5050/callback",
  clientId,
  clientSecret,
});

spotifyApi.clientCredentialsGrant().then(
  function (data) {
    console.log("The access token expires in " + data.body["expires_in"]);
    // console.log("The access token is " + data.body["access_token"]);

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Endpoints here!
// auth endpoints
app.post("/api/register", register);
app.post("/api/login", login);
app.get("/api/checkUser", checkUser);
app.delete("/api/logout", logout);
app.put("/api/updateUser", updateUser);

app.post("/api/getSong", getSong);
app.post("/api/getAnonSong", getAnonSong);
app.post("/api/addSong", addSong);
app.get("/api/getAllSongs", getAllSongs);

app.get("/api/getToken", (req, res) => {
  res.send(spotifyApi.getAccessToken());
});
// app.get("/callback", function (req, res) {
//   const error = req.query.error;
//   const code = req.query.code;
//   const state = req.query.state;

//   if (error) {
//     console.error("Callback error:", error);
//     res.send(`Callback Error:, ${error}`);
//     return;
//   }

//   spotifyApi
//     .authorizationCodeGrant(code)
//     .then((data) => {
//       const access_token = data.body["access_token"];
//       const refresh_token = data.body["refresh_token"];
//       const expires_in = data.body["expires_in"];

//       spotifyApi.setAccessToken(access_token);
//       spotifyApi.setRefreshToken(refresh_token);

//       console.log("access token:", access_token);
//       console.log("refresh token:", refresh_token);

//       console.log(
//         "Successfully retrieved Access token. expires in:",
//         expires_in
//       );
//       res.redirect("/");

//       setInterval(async () => {
//         const data = await spotifyApi.refreshAccessToken();
//         const access_token = data.body["access_token"];

//         console.log("the access token has been refreshed");
//         console.log("access token:", access_token);
//         spotifyApi.setAccessToken(access_token);
//       }, (expires_in / 2) * 1000);
//     })
//     .catch((err) => {
//       console.log("error getting tokens", err);
//       res.send("error getting tokens", err);
//     });
// });
// app.get("/spotifyAuth", (req, res) => {
//   res.redirect(spotifyApi.createAuthorizeURL(scopes));
// });
// app.get("/auth/login", (req, res) => {
//   var scope =
//     "streaming \
//                user-read-email \
//                user-read-private";

//   var state = "randomString";

//   var auth_query_parameters = new URLSearchParams({
//     response_type: "code",
//     client_id: clientId,
//     scope: scope,
//     redirect_uri: spotify_redirectUri,
//     state: state,
//   });

//   console.log(
//     "https://accounts.spotify.com/authorize/?" +
//       auth_query_parameters.toString()
//   );
//   res.redirect(
//     "https://accounts.spotify.com/authorize/?" +
//       auth_query_parameters.toString()
//   );
// });

// app.get("/callback", (req, res) => {
//   var code = req.query.code;

//   var authOptions = {
//     url: "https://accounts.spotify.com/api/token",
//     form: {
//       code: code,
//       redirect_uri: spotify_redirectUri,
//       grant_type: "authorization_code",
//     },
//     headers: {
//       Authorization:
//         "Basic " +
//         Buffer.from(clientId + ":" + clientSecret).toString("base64"),
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     json: true,
//   };

//   app.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       var access_token = body.access_token;
//       res.redirect("/");
//     }
//   });
// });

ViteExpress.listen(app, PORT, () => console.log(`${PORT} chance baby`));

export { spotifyApi };
