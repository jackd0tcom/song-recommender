import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import SpotifyWebPlayer from "react-spotify-web-playback";

const WebPlayer = ({ songId }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    axios.get("/api/getToken").then((res) => setToken(res.data));
  }, []);

  return (
    <>
      <SpotifyWebPlayer token={token} uris={[`spotify:track:${songId}`]} />
    </>
  );
};

export default WebPlayer;
