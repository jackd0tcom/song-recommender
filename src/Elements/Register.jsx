import React from "react";
import GenresForm from "./GenresForm";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = ({
  submit,
  register,
  setUsername,
  setPassword,
  username,
  password,
  artists,
  genres,
  setArtists,
  setGenres,
  isError,
  errorMsg,
  setErrorMsg,
}) => {
  const navigate = useNavigate();
  useEffect(() => {
    setErrorMsg(false);
  }, []);
  return (
    <>
      <nav className="h-20 flex items-center pl-16 cursor-pointer">
        <a
          onClick={() => navigate("/")}
          className="text-white p2 text-2xl font-semibold hover:ring-2"
        >
          Recommend-0
        </a>
      </nav>
      <section className="h-screen border-green-400 flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-yellow-800 via-teal-400 to-yellow-600">
        <div className="flex flex-col justify-evenly text-center w-2/5 bg-neutral-900 h-3/5 items-center shadow-2xl py-4">
          {" "}
          <h1 className="font-semibold text-5xl text-white">Sign Up</h1>
          <form
            onSubmit={(e) => submit(e)}
            className="flex-col w-2/3 items-center flex justify-evenly"
          >
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-3xl border-gray-300 p-4 pl-6 w-full my-2 hover:ring-2 ring-yellow-700 bg-neutral-900 text-white"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-3xl border-gray-300 p-4 pl-6 w-full my-2 hover:ring-2 ring-yellow-600 bg-neutral-900 text-white"
            />
            <button
              onClick={register}
              className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white py-4 px-4 rounded-full w-1/2 my-4 text-xl font-normal"
            >
              Sign Up
            </button>
          </form>
          {isError ? (
            <p className="text-red-600 font-semibold m-0 p-0">{errorMsg}</p>
          ) : null}
          <p className="italic text-sm -mb-6 text-gray-300">
            Already have an account?
          </p>
          <button
            onClick={() => register(false)}
            className="hover:ring-2 p-2 rounded text-white font-bold"
          >
            Login
          </button>
        </div>
      </section>
    </>
  );
};

export default Register;
