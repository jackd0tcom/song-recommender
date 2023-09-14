import { useState } from "react";
import SongRecCard from "../Elements/SongRecCard";
import { render } from "react-dom";

const AnonSong = () => {
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    return <SongRecCard artists={artists} genres={genres} />;
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Liked Artists (Max 5)"
          onChange={(e) => setArtists(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="Liked Genres (Max 5)"
          onChange={(e) => setGenres(e.target.value)}
        />
        <br />
        <button>gimme a song!</button>
      </form>
    </>
  );
};

export default AnonSong;
