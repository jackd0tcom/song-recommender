import axios from "axios";
import { useState } from "react";
import Login from "../Elements/Login";
import Register from "../Elements/Register";
import { useDispatch } from "react-redux";

const Landing = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [artists, setArtists] = useState("");
  const [genres, setGenres] = useState("");
  const [register, setRegister] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isError, setIsError] = useState(false);
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
              artists,
              genres,
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
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setErrorMsg(err.response.data);
      });
  };

  return register ? (
    <Register
      submit={handleFormSubmit}
      register={setRegister}
      setUsername={setUsername}
      setPassword={setPassword}
      username={username}
      password={password}
      artists={artists}
      genres={genres}
      setArtists={setArtists}
      setGenres={setGenres}
      errorMsg={errorMsg}
      isError={isError}
      setErrorMsg={setErrorMsg}
    />
  ) : (
    <Login
      submit={handleFormSubmit}
      register={setRegister}
      setUsername={setUsername}
      setPassword={setPassword}
      username={username}
      password={password}
      errorMsg={errorMsg}
      isError={isError}
      setErrorMsg={setErrorMsg}
    />
  );
};

export default Landing;
