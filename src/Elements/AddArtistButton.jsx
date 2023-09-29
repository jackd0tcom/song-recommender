import React from "react";
import { useState } from "react";
import axios from "axios";

const AddArtistButton = ({ artists, setArtists, setDisplayedArtists }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newArtist, setNewArtist] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedArtists = artists + newArtist + ",";
      setArtists(updatedArtists);
      await axios.put("/api/updateUser", { artists: updatedArtists });
      const artistData = await axios.get("/api/getAllArtists");
      console.log(artistData.data);
      setDisplayedArtists(artistData.data);
      setIsAdding(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = () => {
    setIsAdding(true);
  };

  return isAdding ? (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add an artist here"
          onChange={(e) => setNewArtist(e.target.value)}
        />
        <button>Add Artist</button>
      </form>
    </>
  ) : (
    <button onClick={handleClick}>Add an artist</button>
  );
};

export default AddArtistButton;
