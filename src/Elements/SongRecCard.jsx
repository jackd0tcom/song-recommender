import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import WebPlayer from "./WebPlayer";

const SongRecCard = ({ artists, genres, popularity }) => {
  const [songTitle, setSongTitle] = useState("");
  const [songId, setSongId] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [artistUrl, setArtistUrl] = useState("");

  const userId = useSelector((state) => state.userId);

  const getSong = () => {
    axios
      .post(userId ? "/api/getSong" : "/api/getAnonSong", {
        artists,
        genres,
        popularity,
      })
      .then((res) => {
        setSongTitle(res.data.tracks[0].name);
        setSongId(res.data.tracks[0].id);
        setAlbumTitle(res.data.tracks[0].album.name);
        setArtistName(res.data.tracks[0].artists[0].name);
        setAlbumCover(res.data.tracks[0].album.images[0].url);
        setSongUrl(res.data.tracks[0].external_urls.spotify);
        setArtistUrl(res.data.tracks[0].artists[0].external_urls.spotify);
        console.log(artistUrl);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSong();
  }, []);

  const handleGetAnother = () => {
    setSongTitle("");
  };

  return (
    <>
      <img src={albumCover} />
      <h2>{songTitle}</h2>
      <h3>{albumTitle}</h3>
      <a href={artistUrl}>{artistName}</a>
      <br />
      <button onClick={getSong}>gimme another</button>
      <br />
      <a href={songUrl}>Check out on Spotify!</a>
    </>
  );
};

export default SongRecCard;
