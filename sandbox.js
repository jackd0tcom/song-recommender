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

const bensFunc = (str) => {
  if (!str.charAt(0)) {
    throw new Error("please enter something");
  } else {
    const arr = str.toLowerCase().trim().split(" ");
    let newStr = "";
    arr.forEach((el) => {
      if (el !== "") {
        const capLetter = el.trim().charAt(0).toUpperCase();
        const word = el.replace(el.charAt(0), capLetter);
        newStr += word + " ";
      }
    });
    return newStr.trim();
  }
};

bensFunc("test    yup Woohoo");
