import React from "react";
import axios from "axios";

const Login = ({
  submit,
  register,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <>
      <h1>Login Below</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>Login</button>
        <br />
      </form>
      <button onClick={register}>Create new account</button>
      <br />
      <h3>If you want to stream the song here, you must:</h3>
      <br />
      <button onClick={async () => await axios.get("/spotifyAuth")}>
        Sign in with Spotify
      </button>
    </>
  );
};

export default Login;
