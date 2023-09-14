import React from "react";

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
}) => {
  return (
    <>
      <h1>Create New Account</h1>
      <form onSubmit={(e) => submit(e)}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="text"
          id="artists"
          placeholder="Liked Artists (5 Max)"
          value={artists}
          onChange={(e) => setArtists(e.target.value)}
        />
        <br />
        <input
          type="text"
          id="genres"
          placeholder="Liked Genres (Max 5)"
          value={genres}
          onChange={(e) => setGenres(e.target.value)}
        />
        <br />

        <button>Create New Account</button>
      </form>
    </>
  );
};

export default Register;
