import React from "react";
import axios from "axios";

const Login = () => {
  const click = async (req, res) => {
    await axios.get("/app/addUser");
    console.log(res);
  };

  return (
    <>
      <h1>Login</h1>
      <button onClick={click}>create user</button>
    </>
  );
};

export default Login;
