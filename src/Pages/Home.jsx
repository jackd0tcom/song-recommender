import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import SongRecCard from "../Elements/SongRecCard";
import SidePanel from "../Elements/SidePanel";
import Nav from "../Elements/Nav";
import SongHistory from "../Elements/SongHistory";

const Home = () => {
  const userId = useSelector((state) => state.userId);
  const [showHistory, setShowHistory] = useState(false);
  const [isError, setIsError] = useState(false);

  const clickHistory = () => {
    setShowHistory(true);
  };

  const clickHome = () => {
    setShowHistory(false);
  };

  const navigate = useNavigate();
  return !userId ? (
    <section className="h-screen flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-yellow-800 via-teal-400 to-yellow-600">
      <div className=" border-green-400 h-4/5 w-3/4 flex flex-col justify-evenly p-10 items-center bg-neutral-900 shadow-2xl shadow-black">
        <h2 className="text-white text-3xl font-bold">Welcome to</h2>
        <h1 className="text-white text-8xl font-bold">Recommend-O</h1>
        <p className="text-white text-xl italic tracking-wider">
          Your secret weapon for becoming the next indie head overlord of the
          internet
        </p>
        <div className="flex flex-col justify-around h-1/4 w-full items-center">
          <p className="text-white">
            A portfolio project made with love by Jack Ball
          </p>
          <div className="flex items-center justify-evenly w-2/5">
            <p className="text-white text-2xl">Utilizing the</p>
            <img
              src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
              alt="spotify-logo"
              className="w-[12rem]"
            />
            <p className="text-white text-2xl">API</p>
          </div>
        </div>

        <div className="w-3/4 p-8">
          <p className="text-white text-center tracking-wide text-xl">
            All u gotta do is give me a few artists of your choice, a few genres
            of favorites, and ill spit u back out a song u may or may not like!
          </p>
        </div>
        <button onClick={() => navigate("/login")} className="btn-main px-2">
          Get Started
        </button>
      </div>
    </section>
  ) : (
    <>
      <div className="flex border-green-600 h-screen">
        <SidePanel />
        <section className="h-full overflow-clip flex flex-col w-full">
          <Nav clickHistory={clickHistory} clickHome={clickHome} />
          {showHistory ? (
            <SongHistory />
          ) : (
            <SongRecCard isError={isError} setIsError={setIsError} />
          )}
        </section>
      </div>
    </>
  );
};

export default Home;
