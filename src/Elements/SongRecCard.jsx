import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Nav from "./Nav";

const SongRecCard = ({ artists, genres, popularity }) => {
  const [songTitle, setSongTitle] = useState("");
  const [songId, setSongId] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [artistUrl, setArtistUrl] = useState("");
  const [firstSong, setFirstSong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const userId = useSelector((state) => state.userId);

  const getSong = () => {
    setFirstSong(true);
    setIsLoading(true);
    axios
      .post(userId ? "/api/getSong" : "/api/getAnonSong", {
        artists,
        genres,
        popularity,
      })
      .then((res) => {
        setTimeout(() => {
          setIsLoading(false);
          setSongTitle(res.data.tracks[0].name);
          setSongId(res.data.tracks[0].id);
          setAlbumTitle(res.data.tracks[0].album.name);
          setArtistName(res.data.tracks[0].artists[0].name);
          setAlbumCover(res.data.tracks[0].album.images[0].url);
          setSongUrl(res.data.tracks[0].external_urls.spotify);
          setArtistUrl(res.data.tracks[0].artists[0].external_urls.spotify);
          console.log(artistUrl);
        }, 250);
      })
      .catch((err) => console.log(err));
  };

  const handleGetAnother = () => {
    setSongTitle("");
  };

  return firstSong ? (
    isLoading ? (
      <>
        <div className="bg-neutral-800 h-full rounded flex flex-col items-center m-4 mt-2 justify-evenly">
          <div className="shadow-xl shadow-black p-4 h-3/4 w-1/2 rounded-xl flex flex-col justify-evenly items-center bg-neutral-900">
            <div className="shadow-l shadow-black h-3/4 w-full bg-neutral-700 animate-pulse" />
          </div>
          <button
            onClick={getSong}
            className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white font-semibold py-6 rounded-full w-1/3 text-xl"
          >
            Get a New Recommend-0
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="bg-neutral-800 h-full rounded flex flex-col items-center m-4 mt-2 justify-evenly">
          <div className="shadow-xl shadow-black p-4 h-3/4 rounded-xl flex flex-col justify-evenly items-center bg-neutral-900">
            <img className="shadow-l shadow-black h-3/4" src={albumCover} />
            <h2 className="text-white text-2xl font-semibold">{songTitle}</h2>
            {/* <h3 className="text-white">{albumTitle}</h3> */}
            <a href={artistUrl} target="_blank" className="text-white text-xl">
              {artistName}
            </a>
            <a href={songUrl} className="text-neutral-400 underline italic ">
              Check out on Spotify!
            </a>
          </div>
          <button
            onClick={getSong}
            className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white font-semibold py-6 rounded-full w-1/3 text-xl"
          >
            Get a New Recommend-0
          </button>
        </div>
      </>
    )
  ) : (
    <div className="bg-neutral-800 h-full rounded flex flex-col items-center m-4 mt-2 justify-center">
      <div className="flex flex-col h-1/4 justify-evenly items-center">
        <h1 className="text-white text-3xl">
          Add your favorite artists and genres to the left
        </h1>
        <h1 className="text-white text-2xl">
          Then click below to get a new Recommend-0!
        </h1>
      </div>
      <button
        onClick={getSong}
        className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white font-semibold py-6 rounded-full w-1/3 text-xl"
      >
        Get a New Recommend-0
      </button>
    </div>
  );
};

export default SongRecCard;
