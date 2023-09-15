import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import AnonSong from "./Pages/AnonSong";
import SongRec from "./Pages/SongRec";
import EditUser from "./Pages/EditUser";
import FormikComp from "./Elements/Formik";
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
        <Route path="/anonSong" element={<AnonSong />} />
        <Route path="/formik" element={<FormikComp />} />
        <Route path="/songRec" element={<SongRec />} />
        <Route path="/editUser" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
