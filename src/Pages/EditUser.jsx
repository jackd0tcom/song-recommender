import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GenresForm from "../Elements/GenresForm";
import Login from "../Elements/Login";

const EditUser = () => {
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");

  useEffect(() => {
    axios
      .get("api/checkUser")
      .then((res) => {
        setUsername(res.data.username);
        setArtists(res.data.artists);
        setGenres("");
      })
      .catch((err) => console.log(err));
  }, []);

  const noUser = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/api/updateUser", { username, artists, genres });
    alert("Account successfully changed!");
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
        <label htmlFor="artists">Artists</label>
        <input
          type="text"
          name="artists"
          id="artists"
          value={artists}
          onChange={(e) => setArtists(e.target.value)}
        />
        <br />
        <GenresForm genres={genres} setGenres={setGenres} />
        <br />
        <button>Edit Account</button>
      </form>
    </>
  ) : null;
};

export default EditUser;
