import { useEffect, useState } from "react";
import axios from "axios";

const SongRecCard = () => {
  const [songTitle, setSongTitle] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [albumCover, setAlbumCover] = useState("");

  useEffect(() => {
    axios
      .post("api/getSong")
      .then((res) => {
        // console.log(res.data);
        setSongTitle(res.data.tracks[0].name);
        setAlbumTitle(res.data.tracks[0].album.name);
        setArtistName(res.data.tracks[0].artists[0].name);
        setAlbumCover(res.data.tracks[0].album.images[0].url);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(songTitle);

  return (
    <>
      <img src={albumCover} />
      <h2>{songTitle}</h2>
      <h2>{albumTitle}</h2>
      <h2>{artistName}</h2>
    </>
  );
};

export default SongRecCard;
