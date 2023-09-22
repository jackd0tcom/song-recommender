import React from "react";
import { useSelector } from "react-redux";
import SongRecCard from "../Elements/SongRecCard";
import GenresForm from "../Elements/GenresForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const SongRec = () => {
  const location = useLocation();
  const isAnon = location.state.isAnon;
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");
  const [popularity, setPopularity] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/anonSong", { state: { artists, genres, popularity } });
  };

  return (
    <>
      {isAnon === false ? (
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
            <GenresForm genres={genres} setGenres={setGenres} />
            <br />
            <button>gimme a song!</button>
            <br />
            <label htmlFor="popularity">Define popularity:</label>
            <br />
            <input
              type="range"
              id="popularity"
              onChange={(e) => {
                setPopularity(e.target.value);
              }}
            />
          </form>
        </>
      )}
    </>
  );
};

export default SongRec;
