import { spotifyApi } from "../index.js";

export default {
  getSong: async (req, res) => {
    const { artistIds, genres } = req.session.user;
    await spotifyApi
      .getRecommendations({
        limit: 1,
        market: "US",
        seed_artists: [artistIds],
        seed_genres: [genres],
      })
      .then(
        function (data) {
          let recommendations = data.body;
          console.log(recommendations);
          res.send(recommendations);
        },
        function (err) {
          console.log(err);
        }
      );
  },
  getAnonSong: async (req, res) => {
    console.log("getAnonSong");
    const { artists, genres } = req.body;
    let artistIdString = "";
    const artistStrings = artists.split(", ");

    for (let artistName of artistStrings) {
      await spotifyApi.searchArtists(`${artistName}`, { limit: 1 }).then(
        function (data) {
          const Id = data.body.artists.items[0].id;
          artistIdString += Id + ",";
        },
        function (err) {
          console.log(err);
        }
      );
    }
    const artistIds = artistIdString.slice(0, -1);

    await spotifyApi
      .getRecommendations({
        limit: 1,
        market: "US",
        seed_artists: [artistIds],
        seed_genres: [genres],
      })
      .then(
        function (data) {
          let recommendations = data.body;
          res.send(recommendations);
        },
        function (err) {
          console.log(err);
        }
      );
  },
  spotifyAuth: async (req, res) => {
    const scope = "streaming  user-read-email  user-read-private";
    const state = "myStateCode";

    const auth_query_parameters = new URLSearchParams({
      response_type: "code",
      client_id: process.env.SPOTIFY_CLIENT_ID,
      scope,
      redirect_uri: "http://localhost:5050/callback",
      state,
    });
    res.redirect(
      "https://accounts.spotify.com/authorize/?" +
        auth_query_parameters.toString()
    );
  },
};
