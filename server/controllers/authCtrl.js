import { User, Likes, Artist } from "../model.js";
import bcrypt from "bcryptjs";
import { spotifyApi } from "../index.js";

export default {
  register: async (req, res) => {
    try {
      console.log("register");
      const { username, password, artists, genres } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        res.status(400).send("That username is already taken.");
      } else {
        // password hashing
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        let artistIdString = "";
        const artistStrings = artists.split(", ");
        let artistObj = [];
        let newArtists = "";

        for (let artistName of artistStrings) {
          await spotifyApi.searchArtists(`${artistName}`, { limit: 1 }).then(
            function (data) {
              const Id = data.body.artists.items[0].id;
              artistIdString += Id + ",";
              artistObj.push({
                artist: data.body.artists.items[0].name,
                genres: data.body.artists.items[0].genres,
                url: data.body.artists.items[0].external_urls.spotify,
                image: data.body.artists.items[0].images,
              });
              newArtists += data.body.artists.items[0].name + ",";
            },
            function (err) {
              console.log(err);
            }
          );
        }
        const artistIds = artistIdString.slice(0, -1);

        const newUser = await User.create({
          username,
          password: hash,
        });

        const newUserLikes = await Likes.create({
          artistIds: artistIds,
          artists: newArtists,
          genres,
        });

        newUserLikes.setUser(newUser.userId);

        artistObj.forEach(async (artist) => {
          console.log(artist);
          const newArtist = await Artist.create({
            artist: artist.artist,
            image: artist.image[0].url,
            url: artist.url,
            genres: artist.genres.join(" "),
            userId: newUser.userId,
          });
        });

        req.session.user = {
          userId: newUser.userId,
          username: newUser.username,
          artistIds: newUserLikes.artistIds,
          artists: newUserLikes.artists,
          genres: newUserLikes.genres,
        };

        res.status(200).send(req.session.user);
        console.log(req.session.user);
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
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        const loggedIn = bcrypt.compareSync(password, foundUser.password);
        const userLikes = await Likes.findOne({
          where: { userId: foundUser.userId },
        });
        const { artistIds, artists, genres } = userLikes;
        if (loggedIn) {
          req.session.user = {
            userId: foundUser.userId,
            username: foundUser.username,
            artists,
            artistIds,
            genres,
          };
          res.send(req.session.user);
          console.log("logged in successfully!");
        } else {
          res.status(401).send("Incorrect Password");
        }
      } else {
        res.status(400).send("There is no user with that username");
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },

  checkUser: async (req, res) => {
    if (req.session.user) {
      res.status(200).send(req.session.user);
    } else {
      res.status(400).send("There is no user on the session");
    }
  },
  logout: async (req, res) => {
    console.log("logout");
    req.session.destroy();
    res.status(200).send("there is no user on the session boi");
  },
  updateUser: async (req, res) => {
    try {
      console.log("updateUser");
      if (req.session.user) {
        const { artists, genres, username } = req.body;
        const { userId } = req.session.user;
        const currentUserLikes = await Likes.findOne({ where: { userId } });
        const currentUser = await User.findOne({ where: { userId } });

        if (artists) {
          console.log(artists);
          let artistIdString = "";
          const artistStrings = artists.trim().split(",");
          let artistObj = [];

          for (let artistName of artistStrings) {
            await spotifyApi.searchArtists(`${artistName}`, { limit: 1 }).then(
              function (data) {
                const Id = data.body.artists.items[0].id;
                artistIdString += Id + ",";
                artistObj.push({
                  artist: data.body.artists.items[0].name,
                  genres: data.body.artists.items[0].genres[0],
                  url: data.body.artists.items[0].external_urls.spotify,
                  image: data.body.artists.items[0].images,
                });
              },
              function (err) {
                console.log(err);
              }
            );
          }
          const artistIds = artistIdString.slice(0, -1);

          await Artist.destroy({ where: { userId } });

          artistObj.forEach(async (artist) => {
            const newArtist = await Artist.create({
              artist: artist.artist,
              image: artist.image[0].url,
              url: artist.url,
              genres: artist.genres
                .split(" ")
                .map((el) => {
                  return el.replace(el[0], el[0].toUpperCase());
                })
                .join(" "),
              userId: currentUser.userId,
            });
          });

          req.session.user.artists = artists;
          req.session.user.artistIds = artistIds;

          currentUserLikes.update({
            artists: artists,
            artistIds: artistIds,
          });
        }

        if (username) {
          const usernameTaken = await User.findOne({ where: { username } });
          if (!usernameTaken || usernameTaken.dataValues.userId === userId) {
            console.log("user found");
            currentUser.update({ username: username });
            await currentUser.save();
            req.session.user.username = username;
          } else {
            res.send("that username is already taken, try a different one!");
          }
        }

        if (genres) {
          currentUserLikes.update({
            genres: genres,
          });
          await currentUserLikes.save();
          req.session.user.genres = genres;
        }

        req.session.user.userId = userId;
        res.send(req.session.user);
        console.log(req.session.user);
      } else {
        res.status(400).send("You are not logged in!");
      }
    } catch (err) {
      console.log(err);
    }
  },
};
