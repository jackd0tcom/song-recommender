import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const EditUser = () => {
  const userId = useSelector((state) => state.userId);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await axios.get("api/checkUser");
        setUsername(userData.data.username);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put("/api/updateUser", { username });
  };

  return (
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
        <button>Edit Account</button>
      </form>
    </>
  );
};

export default EditUser;
