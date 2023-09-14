import React from "react";
import { useSelector } from "react-redux";
import SongRecCard from "../Elements/SongRecCard";
import AnonSong from "./AnonSong";
import { useState } from "react";

const SongRec = () => {
  const userId = useSelector((state) => state.userId);

  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(artists, genres);
    return (
      <>
        <SongRecCard artists={artists} genres={genres} />
      </>
    );
  };

  return (
    <>
      {userId ? (
        // need to make a new route to send not logged in user to the

        <SongRecCard />
      ) : (
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
      )}
    </>
  );
};

export default SongRec;
