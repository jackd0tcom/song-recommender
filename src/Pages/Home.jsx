import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SongHistory from "../Elements/SongHistory";

const Home = () => {
  const userId = useSelector((state) => state.userId);

  const isNotAnon = async () => {
    navigate("/songRec", { state: { isAnon: true } });
  };

  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome to SongRecommend-O</h1>
      <p>
        <i>
          Your secret weapon for becoming the next indie head overlord of the
          internet
        </i>
      </p>
      <br />
      {userId ? (
        <button
          onClick={() => {
            navigate("/songRec", { state: { isAnon: false } });
          }}
        >
          Get a recommendation for you
        </button>
      ) : null}
      <br />
      <button onClick={isNotAnon}>Get a new recommendation</button>
      <br />
      <br />
      {userId ? "" : <button onClick={() => navigate("/login")}>Login</button>}
      <br />
      <div>{userId ? <SongHistory /> : null}</div>
    </div>
  );
};

export default Home;
