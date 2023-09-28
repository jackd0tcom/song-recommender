import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const ArtistCard = ({ artistData }) => {
  const allArtists = artistData.map((artist) => {
    return (
      <div key={artist.artist}>
        <img src={artist.image} />
        <p>{artist.artist}</p>
        <p>{artist.genres}</p>
        <a href={artist.url}>Check out on spotify!</a>
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
