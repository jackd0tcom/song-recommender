import { User, Likes } from "../model.js";
import bcrypt from "bcryptjs";
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

export default {
  // controller functions
  register: async (req, res) => {
    // need to get access to artists and genres
    // need to seperate them out somehow
    // need to make a spotify api request to get artistIds, and add those returned IDs to the likes table

    try {
      const { username, password, fname, lname, artists, genres } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        res.status(400).send("That username is already taken.");
      } else {
        // password hashing
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // artist handling
        // example input: "rush, led zeppelin, ohsees"
        // seperate them into individual artist strings
        // send them over to spotify api
        // add returned artistID to empty string
        // add said string to likes table

        let artistIds = "";
        const artistStrings = artists.split(", ");
        spotifyApi.searchArtists(`${artistStrings[0]}`, { limit: 1 }).then(
          function (data) {
            console.log(data.body.artists.items[0].id);
          },
          function (err) {
            console.log(err);
          }
        );

        // const IdArray = artistStrings.map((art) => {
        //   spotifyApi.searchArtists(`${art}`).then(
        //     function (data) {
        //       console.log(data.body);
        //     },
        //     function (err) {
        //       console.log(err);
        //     }
        //   );
        // });

        // ** Genres handling **
        // example input : "psych rock, pop, rap, hip hop"
        // just need to push that string to the table

        const newUser = await User.create({
          username,
          password: hash,
          fname,
          lname,
        });

        // const newUserLikes = await Likes.create({
        //   userId: newUser.userId,
        //   artists: "",
        //   genres,
        // });

        req.session.user = {
          userId: newUser.userId,
          username: newUser.username,
          //   artists: newUserLikes.artists,
          //   genres: newUserLikes.genres,
        };

        res.status(200).send(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },
  login: async (req, res) => {
    try {
      console.log("login");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  checkUser: async (req, res) => {
    try {
      console.log("checkUser");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  logout: async (req, res) => {
    try {
      console.log("logout");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
};
