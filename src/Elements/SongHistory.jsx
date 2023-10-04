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
        <div
          className="shadow-xl shadow-black p-4 m-2 mx-4 rounded-xl hover:bg-neutral-800 flex w-full h-60 items-center bg-neutral-800"
          key={song.song}
        >
          <img
            className="shadow-l shadow-black h-full basis-60 rounded-lg"
            src={song.albumCover}
          />
          <div className="flex flex-col w-full pl-6 h-3/4 justify-evenly">
            <p className="text-white text-2xl font-semibold">{song.song}</p>
            {/* <p className="text-white">{song.album}</p> */}
            <p className="text-white text-xl">{song.artist}</p>
            <a
              href={song.url}
              target="_blank"
              className="text-neutral-400 underline italic "
            >
              View on Spotify!
            </a>
          </div>
        </div>
      );
    });

    return (
      <div className="bg-neutral-800 h-full rounded flex flex-col items-center p-4 m-4 mt-2">
        <h3 className="text-white text-2xl font-semibold p-4">
          Your Recommendation History:
        </h3>
        <div className="flex flex-col items-center justify-evenly bg-neutral-950 rounded-l shadow-lg shadow-black w-full h-3/4 overflow-auto pt-10">
          {allSongs.reverse()}
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default SongHistory;
