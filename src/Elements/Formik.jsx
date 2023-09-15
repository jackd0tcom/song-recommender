import React from "react";
import { Formik, Field, Form } from "formik";
import { useFormik } from "formik";

const genresArr = [
  "Acoustic",
  "Afrobeat",
  "Alt-rock",
  "Alternative",
  "Ambient",
  "Anime",
  "Black-metal",
  "Bluegrass",
  "Blues",
  "Bossanova",
  "Brazil",
  "Breakbeat",
  "British",
  "Bantopop",
  "Chicago-house",
  "Children",
  "Chill",
  "Classical",
  "Club",
  "Comedy",
  "Country",
  "Dance",
  "Dancehall",
  "Death-metal",
  "Deep-house",
  "Detroit-techno",
  "Disco",
  "Disney",
  "Drum-and-bass",
  "Dub",
  "Dubstep",
  "Edm",
  "Electro",
  "Electronic",
  "Emo",
  "Folk",
  "Forro",
  "French",
  "Funk",
  "Garage",
  "German",
  "Gospel",
  "Goth",
  "Grindcore",
  "Groove",
  "Grunge",
  "Guitar",
  "Happy",
  "Hard-rock",
  "Hardcore",
  "Hardstyle",
  "Heavy-metal",
  "Hip-hop",
  "Holidays",
  "Honky-tonk",
  "House",
  "Idm",
  "Indian",
  "Indie",
  "Indie-pop",
  "Industrial",
  "Iranian",
  "J-dance",
  "J-idol",
  "J-pop",
  "J-rock",
  "Jazz",
  "K-pop",
  "Kids",
  "Latin",
  "Latino",
  "Malay",
  "Mandopop",
  "Metal",
  "Metal-misc",
  "Metalcore",
  "Minimal-techno",
  "Movies",
  "Mpb",
  "New-age",
  "New-release",
  "Opera",
  "Pagode",
  "Party",
  "Philippines-opm",
  "Piano",
  "Pop",
  "Pop-film",
  "Post-dubstep",
  "Power-pop",
  "Progressive-house",
  "Psych-rock",
  "Punk",
  "Punk-rock",
  "R-n-b",
  "Rainy-day",
  "Reggae",
  "Reggaeton",
  "Road-trip",
  "Rock",
  "Rock-n-roll",
  "Rockabilly",
  "Romance",
  "Sad",
  "Salsa",
  "Samba",
  "Sertanejo",
  "Show-tunes",
  "Singer-songwriter",
  "Ska",
  "Sleep",
  "Songwriter",
  "Soul",
  "Soundtracks",
  "Spanish",
  "Study",
  "Summer",
  "Swedish",
  "Synth-pop",
  "Tango",
  "Techno",
  "Trance",
  "Trip-hop",
  "Turkish",
  "Work-out",
  "World-music",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const FormikComp = ({
  setUsername,
  setPassword,
  setArtists,
  setGenres,
  register,
  username,
  password,
  artists,
  submit,
  genres,
}) => {
  const genreBoxes = genresArr.map((genre) => {
    return (
      <label key={genre}>
        <Field
          type="checkbox"
          name="genres"
          value={genre}
          key={genre}
          onClick={(e) => {
            if (e.target.checked) {
              const array = [...genres, genre + ","];
              const string = array.join("");
              setGenres(string);
              console.log(genres);
            } else {
              const newString = genres.replace(e.target.value + ",", "");
              setGenres(newString);
              console.log(genres);
            }
          }}
        />
        {genre}
      </label>
    );
  });
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          username: username,
          password: password,
          artists: artists,
          genres: [],
        }}
      >
        {({ values }) => (
          <Form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            <Field
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <Field
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <Field
              type="text"
              name="artists"
              placeholder="Artists"
              value={artists}
              onChange={(e) => setArtists(e.target.value)}
            />
            <div id="checkbox-group">Select up to 5 genres:</div>
            <div role="group" aria-labelledby="checkbox-group">
              {genreBoxes}
            </div>
            <button type="submit" onClick={register}>
              Sign Up
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default FormikComp;
