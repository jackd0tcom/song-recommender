import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ArtistCard = () => {
  const [artists, setArtists] = useState("");
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, artistData] = await Promise.all([
          axios.get("api/checkUser"),
          axios.get("/api/getAllArtists"),
        ]);
        setArtists(userData.data.artists);
        setArtistData(artistData.data);
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
  };

  const allArtists = artistData.map((artist) => {
    return (
      // <label htmlFor="artists">Your Artists:</label>
      // <input
      //   type="text"
      //   name="artists"
      //   id="artists"
      //   value={artists}
      //   onChange={(e) => setArtists(e.target.value)}
      // />
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
    </>
  );
};

export default ArtistCard;
