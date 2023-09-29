import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenresForm from "../Elements/GenresForm";
import Login from "../Elements/Login";
import ArtistCard from "../Elements/ArtistsForm";

const EditUser = () => {
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");
  const [artistData, setArtistData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userData, artistData] = await Promise.all([
          axios.get("api/checkUser"),
          axios.get("/api/getAllArtists"),
        ]);
        setUsername(userData.data.username);
        setArtists(userData.data.artists);
        setGenres("");
        setArtistData(artistData.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/api/updateUser", { username, artists, genres });
    await axios.get("/api/getAllArtists").then((res) => {
      setArtistData(res.data);
    });
  };

  return userId ? (
    <>
      <form id="account" onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="artists">Your Artists:</label>
        <input
          type="text"
          name="artists"
          id="artists"
          value={artists}
          onChange={(e) => setArtists(e.target.value)}
        />
        <br />
        <ArtistCard artistData={artistData} />
        <br />
        <GenresForm genres={genres} setGenres={setGenres} />
        <br />
        <button>Edit Account</button>
      </form>
    </>
  ) : null;
};

export default EditUser;
