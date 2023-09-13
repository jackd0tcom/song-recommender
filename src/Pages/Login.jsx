import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [fname, setFName] = useState("first name");
  const [lname, setLName] = useState("last name");
  const [register, setRegister] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.post(register ? "/api/register" : "/api/login", {
      username,
      password,
      fname,
      lname,
    });
  };

  return (
    <>
      <h1>Login Below</h1>
      <button onClick={click}>create user</button>
    </>
  );
};

export default Login;
