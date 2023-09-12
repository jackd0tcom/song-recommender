const artists = "rush, led zeppelin, ohsees";

let artistIds = "";
const artistStrings = artists.split(", ");
const IdArray = artistStrings.map((artist) => {
  spotifyApi.searchArtists(`${artist}`).then(
    function (data) {
      console.log(data.body);
    },
    function (err) {
      console.log(err);
    }
  );
});
