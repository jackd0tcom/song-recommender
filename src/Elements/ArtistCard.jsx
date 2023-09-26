import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ArtistCard = () => {
  const [artistArr, setArtistArr] = useState([]);

  useEffect(() => {
    axios.get("/api/getAllArtists").then((res) => {
      setArtistArr(res.data);
    });
  }, []);

  const allArtists = artistArr.map((artist) => {
    console.log(artist);
    return (
      <>
        <img src={artist.image} />
        <p>{artist.artist}</p>
        <br />
        <p>{artist.genres}</p>
        <br />
        <a href={artist.url}>Check out on spotify!</a>
        <br />
      </>
    );
  });
  return <>{allArtists}</>;
};

export default ArtistCard;
