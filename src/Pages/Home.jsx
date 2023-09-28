import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SongHistory from "../Elements/SongHistory";
import SidePanel from "../Elements/SidePanel";

const Home = () => {
  const userId = useSelector((state) => state.userId);

  const navigate = useNavigate();
  return userId ? (
    <div>
      <h1>Welcome to SongRecommend-O</h1>
      <p>
        <i>
          Your secret weapon for becoming the next indie head overlord of the
          internet
        </i>
      </p>
      <br />
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  ) : (
    <SidePanel />
  );
};

export default Home;
