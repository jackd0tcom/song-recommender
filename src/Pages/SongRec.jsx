import React from "react";
import { useSelector } from "react-redux";
import SongRecCard from "../Elements/SongRecCard";
import AnonSong from "./AnonSong";

const SongRec = () => {
  const userId = useSelector((state) => state.userId);

  return <>{userId ? <SongRecCard /> : <AnonSong />}</>;
};

export default SongRec;
