import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Nav from "./Nav";

const SongRecCard = ({ artists, genres, popularity, isError, setIsError }) => {
  const [songTitle, setSongTitle] = useState("");
  const [songId, setSongId] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [artistUrl, setArtistUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [duration, setDuration] = useState(0);
  const [firstSong, setFirstSong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const userId = useSelector((state) => state.userId);

  const getSong = () => {
    setFirstSong(true);
    setIsLoading(true);
    axios
      .post("/api/getSong")
      .then((res) => {
        console.log(res.data.tracks[0].preview_url);
        setTimeout(() => {
          setIsLoading(false);
          setSongTitle(res.data.tracks[0].name);
          setSongId(res.data.tracks[0].id);
          setAlbumTitle(res.data.tracks[0].album.name);
          setArtistName(res.data.tracks[0].artists[0].name);
          setAlbumCover(res.data.tracks[0].album.images[0].url);
          setSongUrl(res.data.tracks[0].external_urls.spotify);
          setArtistUrl(res.data.tracks[0].artists[0].external_urls.spotify);
          setPreviewUrl(res.data.tracks[0].preview_url);
          setDuration(res.data.tracks[0].duration_ms);
        }, 250);
      })
      .catch((err) => {
        setErrorMsg(err.response.data);
        setIsLoading(false);
        setIsError(true);
      });
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
    ) : isError ? (
      <>
        <div className="bg-neutral-800 h-full rounded flex flex-col items-center m-4 mt-2 justify-evenly">
          <h1 className="text-red-600">{errorMsg}</h1>
          <button
            className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white font-semibold py-6 rounded-full w-1/3 text-xl"
            onClick={() => setIsError(false)}
          >
            Try Again
          </button>
        </div>
      </>
    ) : (
      <>
        <div className="bg-neutral-800 h-full rounded flex flex-col items-center m-4 mt-2 justify-evenly">
          <div className="shadow-xl shadow-black p-4 h-3/4 rounded-xl flex flex-col justify-evenly items-center bg-neutral-900">
            <div className="h-3/4">
              <img className="shadow-l shadow-black h-full" src={albumCover} />
            </div>
            <a
              href={songUrl}
              target="_blank"
              className="text-white text-2xl font-semibold hover:underline"
            >
              {songTitle}
            </a>

            {/* <h3 className="text-white">{albumTitle}</h3> */}
            <a
              href={artistUrl}
              target="_blank"
              className="text-white text-xl hover:underline"
            >
              {artistName}
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
