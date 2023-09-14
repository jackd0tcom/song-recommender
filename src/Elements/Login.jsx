import React from "react";

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
        <a onClick={register}>Create new account</a>
      </form>
    </>
  );
};

export default Login;
