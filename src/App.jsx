import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import AnonSong from "./Pages/AnonSong";
import SongRec from "./Pages/SongRec";
import EditUser from "./Pages/EditUser";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/anonSong" element={<AnonSong />} />
        <Route path="/songRec" element={<SongRec />} />
        <Route path="/editUser" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
