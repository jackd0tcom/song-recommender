import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenresForm from "../Elements/GenresForm";
import Login from "../Elements/Login";
import ArtistCard from "./ArtistsForm";

const SidePanel = () => {
  //   const [artists, setArtists] = useState("");
  //   const [genres, setGenres] = useState("");
  //   const [artistData, setArtistData] = useState([]);

  //   useEffect(() => {
  //     async function fetchData() {
  //       try {
  //         const [userData, artistData] = await Promise.all([
  //           axios.get("api/checkUser"),
  //           axios.get("/api/getAllArtists"),
  //         ]);
  //         setArtists(userData.data.artists);
  //         setGenres("");
  //         setArtistData(artistData.data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     }
  //     fetchData();
  //   }, []);

  //   const handleSubmit = async (e) => {
  //     // e.preventDefault();
  //     await axios.put("/api/updateUser", { artists, genres });
  //     await axios.get("/api/getAllArtists").then((res) => {
  //       setArtistData(res.data);
  //     });
  //   };

  return (
    <div className="side-panel">
      <ArtistCard />
      <br />
      {/* <GenresForm genres={genres} setGenres={setGenres} /> */}
      <br />
    </div>
  );
};

export default SidePanel;
