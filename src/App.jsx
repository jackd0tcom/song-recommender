import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Landing from "./Pages/Landing";
import SongHistory from "./Elements/SongHistory";
import SongRec from "./Pages/SongRec";
import EditUser from "./Pages/EditUser";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

function App() {
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("api/checkUser")
      .then((res) => dispatch({ type: "LOGIN", payload: res.data.userId }))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="/login"
          element={userId ? <Navigate to="/" /> : <Landing />}
        />
        <Route path="/history" element={<SongHistory />} />
        <Route path="/songRec" element={<SongRec />} />
        <Route path="/editUser" element={<EditUser />} />
      </Routes>
    </>
  );
}

export default App;
