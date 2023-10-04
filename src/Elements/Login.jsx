import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({
  submit,
  register,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="h-20 flex items-center pl-16">
        <a
          onClick={() => navigate("/")}
          className="text-white p2 text-2xl font-semibold bg-black hover:ring-2 cursor-pointer"
        >
          Recommend-0
        </a>
      </nav>
      <section className="h-screen border-green-400 flex flex-col justify-center items-center bg-[conic-gradient(at_bottom_left,_var(--tw-gradient-stops))] from-yellow-800 via-teal-400 to-yellow-600">
        <div className="flex flex-col justify-evenly text-center w-2/5 bg-neutral-900 h-3/5 items-center shadow-2xl py-4">
          <h1 className="font-semibold text-5xl text-white">Login</h1>
          <form
            onSubmit={(e) => submit(e)}
            className="flex-col w-2/3 items-center flex justify-evenly"
          >
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border-2 rounded-3xl border-gray-300 p-4 pl-6 w-full my-2 hover:ring-2 ring-yellow-600 bg-neutral-900 text-white"
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 rounded-3xl border-gray-300 p-4 pl-6 w-full my-2 hover:ring-2 ring-yellow-600 bg-neutral-900 text-white"
            />
            <button className="bg-yellow-600 hover:bg-amber-700 duration-150 text-white py-4 px-4 rounded-full w-1/2 my-4 text-xl font-normal">
              Login
            </button>
          </form>
          <p className="italic text-sm -mb-6 text-gray-300">
            Don't have an account yet?
          </p>
          <button
            onClick={register}
            className="hover:ring-2 p-2 rounded text-white font-bold"
          >
            Create New Account
          </button>
        </div>
      </section>
    </>
  );
};

export default Login;
