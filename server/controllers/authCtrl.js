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

        await spotifyApi
          .searchArtists(`${artistStrings[0]}`, { limit: 1 })
          .then(
            function (data) {
              const Id = data.body.artists.items[0].id;
              artistIds += Id;
            },
            function (err) {
              console.log(err);
            }
          );

        const newUser = await User.create({
          username,
          password: hash,
          fname,
          lname,
        });

        console.log("test");
        console.log(artistIds);

        const newUserLikes = await Likes.create({
          artistIds: artistIds,
          genres,
        });

        newUserLikes.setUser(newUser.userId);

        req.session.user = {
          userId: newUser.userId,
          username: newUser.username,
          artists: newUserLikes.artistIds,
          genres: newUserLikes.genres,
          likesTableUserId: newUserLikes.userId,
        };

        res.status(200).send(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
    }
  },

  login: async (req, res) => {
    // get user info from req.body
    // check to make sure there IS a found user
    // if there is no user found, send back status of 400 with an error message for the user
    // if user is found, use bcrypt.compareSync(), and pass in the new password from req.body, as well as the foundUser's password from the db
    // if the passwords match up, send the user info to the session and send status of 200 with the req.session.user
    // if the passwords don't match up, send back 401 status with an error message

    try {
      console.log("login");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },

  checkUser: async (req, res) => {
    // purpose of this! is to check to see if someone is logged in, and get their info
    // check if req.session.user is truthy, send back req.session.user with status 200
    // else send back 400 status with no user on the session
    try {
      console.log("checkUser");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  logout: async (req, res) => {
    req.session.destroy();
    res.status(200).send("there is no user on the session boi");
  },
};
