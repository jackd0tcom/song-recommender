import axios from "axios";
import { useState } from "react";
import Login from "../Elements/Login";
import Register from "../Elements/Register";
import { useDispatch } from "react-redux";

const Landing = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFName] = useState("first name");
  const [lname, setLName] = useState("last name");
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        register ? "/api/register" : "/api/login",
        register
          ? {
              username,
              password,
              fname,
              lname,
            }
          : {
              username,
              password,
            }
      )
      .then((res) => {
        console.log(res.data);
        dispatch({ type: "LOGIN", payload: res.data.userId });
      })
      .catch((err) => console.log(err));
  };

  return register ? (
    <Register />
  ) : (
    <Login
      submit={handleFormSubmit}
      register={setRegister}
      setUsername={setUsername}
      setPassword={setPassword}
      username={username}
      password={password}
    />
  );
};

export default Landing;
