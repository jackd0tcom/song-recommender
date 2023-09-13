import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
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
      <button onClick={() => navigate("/anonSong")}>
        Get a new recommendation
      </button>
      <br />
      <br />
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
};

export default Home;
