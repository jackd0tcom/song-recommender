import { spotifyApi } from "../index.js";

export default {
  getSong: async (req, res) => {
    const { artistIds, genres } = req.session.user;
    await spotifyApi
      .getRecommendations({
        limit: 1,
        market: "US",
        seed_artists: [artistIds],
        // seed_genres: [genres],
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
};
