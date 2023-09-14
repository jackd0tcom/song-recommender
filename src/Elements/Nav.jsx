import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("api/checkUser")
      .then((res) => dispatch({ type: "LOGIN", payload: res.data.userId }))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    axios
      .delete("/api/logout")
      .then((res) => dispatch({ type: "LOGOUT" }))
      .catch((err) => console.log(err));
  };

  return (
    <>
      <button onClick={() => navigate("/")}>Home</button>
      {userId ? (
        <nav>
          <button onClick={logout}>logout</button>
        </nav>
      ) : null}
    </>
  );
};

export default Nav;
