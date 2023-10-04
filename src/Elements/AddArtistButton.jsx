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
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="text"
          placeholder="Enter artist name here"
          onChange={(e) => setNewArtist(e.target.value)}
          className="bg-neutral-700 rounded-l p-2 w-5/6 mb-4 text-white"
        />
        <div className="flex w-full justify-evenly pb-4">
          <button className="text-white px-4 py-2 bg-yellow-600 rounded-full hover:bg-yellow-700 w-1/2">
            Add Artist
          </button>
          <button
            className="text-white px-4 py-2 bg-neutral-500 rounded-full hover:bg-neutral-600"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </>
  ) : (
    <div className="flex items-center justify-center my-4">
      <button
        onClick={handleClick}
        className="text-white p-2 bg-yellow-600 rounded-full w-1/2 hover:bg-yellow-700 transition duration-150"
      >
        Add an Artist
      </button>
    </div>
  );
};

export default AddArtistButton;
