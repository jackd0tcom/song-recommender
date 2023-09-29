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
      <div key={artist.artist}>
        <img src={artist.image} />
        <p>{artist.artist}</p>
        <p>{artist.genres}</p>
        <a href={artist.url}>Check out on spotify!</a>
        <button onClick={() => handleDelete(artist.artist)}>X</button>
        <br />
      </div>
    );
  });
  return (
    <>
      <br />
      {allArtists}
      <br />
      <AddArtistButton
        artists={artists}
        setArtists={setArtists}
        setDisplayedArtists={setDisplayedArtists}
      />
    </>
  );
};

export default ArtistCard;
