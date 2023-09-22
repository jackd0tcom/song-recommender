import { useState } from "react";
import SongRecCard from "../Elements/SongRecCard";
import { useLocation } from "react-router-dom";

const AnonSong = () => {
  const location = useLocation();
  const artists = location.state.artists;
  const genres = location.state.genres;
  const popularity = location.state.popularity;

  return (
    <SongRecCard artists={artists} genres={genres} popularity={popularity} />
  );
};

export default AnonSong;
