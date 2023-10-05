import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const SongHistory = () => {
  const [hover, setHover] = useState(false);
  try {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
      axios.get("/api/getAllSongs").then((res) => {
        setSongs(res.data);
        console.log(res.data);
      });
    }, []);

    const allSongs = songs.map((song, index) => {
      const minutes = Math.floor(song.duration / 60000);
      const seconds = Math.floor((song.duration % 60000) / 1000);
      return (
        <div
          className="flex group justify-evenly shadow-x shadow-black p-4 m-2 pl-0 rounded-xl hover:bg-neutral-900 transition duration-150 h-40 items-center bg-neutral-800"
          key={song.song}
        >
          <div className="relative h-full basis-10">
            <p className="text-white text-xl absolute top-1/3 left-1/4">
              {index + 1}{" "}
            </p>
            <a
              href={song.previewUrl}
              target="_blank"
              className="group-hover:opacity-100 underline italic w-10 opacity-0 absolute top-1/4 transition duration-100 z-10"
            >
              <img
                src="https://simpleicon.com/wp-content/uploads/play1.png"
                className="h-10 bg-yellow-600 rounded-full m-2 ml-0 absolute"
              />
            </a>
          </div>
          <img
            className="shadow-l shadow-black h-full rounded-lg"
            src={song.albumCover}
          />
          <div className="flex flex-col h-3/4 justify-evenly basis-2/3">
            <a
              target="_blank"
              href={song.url}
              className="text-white text-2xl font-semibold"
            >
              {song.song}
            </a>
            {/* <p className="text-white">{song.album}</p> */}
            <p className="text-white text-xl">{song.artist}</p>
          </div>
          <p className="text-white basis-30">
            {minutes}:{seconds}
          </p>
        </div>
      );
    });

    return (
      <div className="bg-neutral-800 h-full rounded flex flex-col items-center p-4 m-4 mt-2">
        <h3 className="text-white text-2xl font-semibold p-4">
          Your Recommendation History:
        </h3>
        <div className="flex flex-col items-center justify-evenly bg-neutral-950 rounded-xl shadow-lg h-3/4 shadow-black w-4/5">
          <div className="overflow-y-scroll w-full">{allSongs.reverse()}</div>
        </div>
      </div>
    );
  } catch (err) {
    console.log(err);
  }
};

export default SongHistory;
