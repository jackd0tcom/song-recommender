import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const SongHistory = () => {
  try {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
      axios.get("/api/getAllSongs").then((res) => {
        setSongs(res.data);
      });
    }, []);

    const allSongs = songs.map((song) => {
      return (
        <div key={song.song}>
          <img src={song.albumCover} />
          <p>{song.song}</p>
          <p>{song.album}</p>
          <p>{song.artist}</p>
          <a href={song.url}>View on Spotify!</a>
          <br />
        </div>
      );
    });

    return (
      <div>
        <h3>Your Recommendation History:</h3>
        {allSongs.reverse()}
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default SongHistory;
