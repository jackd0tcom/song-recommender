import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import SongHistory from "./Elements/SongHistory";
import SongRec from "./Pages/SongRec";
import EditUser from "./Pages/EditUser";
import { useSelector } from "react-redux";
import Nav from "./Elements/Nav";

function App() {
  const userId = useSelector((state) => state.userId);

  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={userId ? <Navigate to="/" /> : <Landing />}
        />
        {/* <Route path="/anonSong" element={<AnonSong />} /> */}
        <Route path="/history" element={<SongHistory />} />
        <Route path="/songRec" element={<SongRec />} />
        <Route path="/editUser" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
