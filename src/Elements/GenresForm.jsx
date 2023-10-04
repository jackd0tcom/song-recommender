import React from "react";
import { useState, useEffect } from "react";

const genresArr = [
  "Acoustic",
  "Afrobeat",
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
  "Chill",
  "Classical",
  "Country",
  "Dance",
  "Death-metal",
  "Deep-house",
  "Detroit-techno",
  "Disco",
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
  "Latin",
  "Metal",
  "Movies",
  "New-age",
  "New-release",
  "Opera",
  "Party",
  "Piano",
  "Pop",
  "Psych-rock",
  "Punk-rock",
  "R-n-b",
  "Rainy-day",
  "Reggae",
  "Reggaeton",
  "Road-trip",
  "Rock",
  "Romance",
  "Sad",
  "Salsa",
  "Samba",
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

const GenresForm = ({ genres, setGenres }) => {
  const [isClicked, setIsClicked] = useState(false);

  const genreBoxes = genresArr.map((genre) => {
    const isChecked = genres.includes(genre);
    return (
      <div key={genre} className="inline-flex">
        <input
          className="hidden"
          type="checkbox"
          name="genres"
          id={genre}
          value={genre}
          key={genre + "-input"}
          checked={isChecked}
          onChange={(e) => {
            if (e.target.checked) {
              if (genres.split(",").length <= 3) {
                const array = [...genres, genre + ","];
                const string = array.join("");
                setGenres(string.trim());
              }
            } else {
              const newString = genres.replace(e.target.value + ",", "");
              setGenres(newString);
            }
          }}
        />
        <label
          htmlFor={genre}
          key={genre + "-label"}
          onClick={() => setIsClicked(true)}
          className={` ${
            isChecked
              ? "text-white p-2 rounded-full bg-yellow-600 m-0.5 border transition border-neutral-900 duration-150 bg-opacity-100"
              : "text-white p-2 rounded-full bg-opacity-30 bg-neutral-600 m-0.5 border border-neutral-900 shadow-sm shadow-black hover:bg-yellow-600 hover:cursor-pointer transition duration-150"
          }`}
        >
          {genre}
        </label>
      </div>
    );
  });
  return (
    <div className="flex flex-col px-4">
      <h3 className="text-neutral-300 text-xl font-semibold mb-4 pl-4">
        Select up to 3 Genres
      </h3>
      <div className="overflow-auto bg-neutral-900 shadow-inner p-1 shadow-neutral-950 h-[26rem] rounded-lg">
        {genreBoxes}
      </div>
    </div>
  );
};

export default GenresForm;
