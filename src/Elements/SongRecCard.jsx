import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import WebPlayer from "./WebPlayer";

const SongRecCard = ({ artists, genres }) => {
  const [songTitle, setSongTitle] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");

  const userId = useSelector((state) => state.userId);

  const getSong = () => {
    axios
      .post(userId ? "/api/getSong" : "/api/getAnonSong", { artists, genres })
      .then((res) => {
        // console.log(res.data);
        setSongTitle(res.data.tracks[0].name);
        setAlbumTitle(res.data.tracks[0].album.name);
        setArtistName(res.data.tracks[0].artists[0].name);
        setAlbumCover(res.data.tracks[0].album.images[0].url);
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
      <h2>{albumTitle}</h2>
      <h2>{artistName}</h2>
      <button onClick={getSong}>gimme another</button>
      <br />
      <WebPlayer />
    </>
  );
};

export default SongRecCard;
