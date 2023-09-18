// const artists = "rush, led zeppelin, ohsees";

// let artistIds = "";
// const artistStrings = artists.split(", ");
// const IdArray = artistStrings.map((artist) => {
//   spotifyApi.searchArtists(`${artist}`).then(
//     function (data) {
//       console.log(data.body);
//     },
//     function (err) {
//       console.log(err);
//     }
//   );
// });

// EASTER EGG BITCHES

const fib = [0, 1];

const fibFunc = (n) => {
  for (let i = 1; i <= n; i++) {
    const newNum = fib[i] + fib[i - 1];
    fib.push(newNum);
  }
  console.log(fib[n]);
};

// fibFunc();
