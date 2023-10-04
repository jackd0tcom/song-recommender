import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import AddArtistButton from "./addArtistButton";

const ArtistCard = () => {
  const [artists, setArtists] = useState("");
  const [artistData, setArtistData] = useState([]);
  const [displayedArtists, setDisplayedArtists] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, artistData] = await Promise.all([
          axios.get("api/checkUser"),
          axios.get("/api/getAllArtists"),
        ]);
        setArtists(userData.data.artists);
        setArtistData(artistData.data);
        setDisplayedArtists(artistData.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleDelete = (artistName) => {
    const newString = artists
      .toLowerCase()
      .replace(artistName.toLowerCase() + ",", "");
    setArtists(newString);
    axios.put("/api/updateUser", { artists: newString });
    setDisplayedArtists(
      displayedArtists.filter((artist) => artist.artist !== artistName)
    );
  };

  const allArtists = displayedArtists.map((artist) => {
    return (
      <div
        key={artist.artist}
        className="flex pb-4 justify-evenly rounded-xl items-center bg-opacity-20 bg-neutral-700 hover:bg-neutral-800 transition duration-200 hover:rounded-xl p-2 m-2"
      >
        <img src={artist.image} className="w-1/3 rounded shadow-lg" />
        <div className="flex flex-col basis-3/5 pl-4 pt-2 h-3/4 justify-evenly">
          <a href={artist.url} className="text-white text-xl">
            {artist.artist}
          </a>
          <p className="text-neutral-500">{artist.genres}</p>
        </div>
        <button
          onClick={() => handleDelete(artist.artist)}
          className="text-white px-4 py-2 border-opacity-50 rounded-full border-neutral-500 border-2 bg-opacity-70 hover:bg-yellow-600 transition duration-150"
        >
          X
        </button>
      </div>
    );
  });
  return (
    <>
      <div className="flex flex-col p-4 pb-0 pt-0">
        <h1 className="text-neutral-300 font-semibold text-xl pl-4 pb-4">
          Artists
        </h1>
        <div className="overflow-auto h-72 shadow-inner rounded-xl bg-neutral-900 transition duration-150 hover:shadow-neutral-900">
          {allArtists}
        </div>
      </div>
      <AddArtistButton
        artists={artists}
        setArtists={setArtists}
        setDisplayedArtists={setDisplayedArtists}
      />
    </>
  );
};

export default ArtistCard;
