import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Nav = ({ clickHistory, clickHome }) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.userId);
  const navigate = useNavigate();

  const logout = () => {
    axios
      .delete("/api/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const editProfile = () => {
    navigate("/editUser");
  };

  return (
    <nav className="flex justify-around align-baseline border-green-600 p-3 bg-neutral-800 items-baseline rounded-xl m-4 mb-2">
      <NavLink
        onClick={clickHome}
        className={
          "text-neutral-100 basis-1/2 text-xl font-semibold hover:text-white hover:text-[1.3rem] duration-200"
        }
      >
        Recommend-0
      </NavLink>
      {userId ? (
        <>
          <NavLink
            onClick={clickHistory}
            className="text-neutral-300 hover:text-white transition duration-150"
          >
            History
          </NavLink>
          <NavLink
            onClick={editProfile}
            className="text-neutral-300 hover:text-white transition duration-150"
          >
            Profile
          </NavLink>
          <button
            onClick={logout}
            className="bg-neutral-700 hover:bg-yellow-700 duration-150 text-white p-2 px-6 rounded-full text-l font-normal"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          <>
            <a onClick={() => navigate("/login")}>Login</a>
          </>
        </>
      )}
    </nav>
  );
};

export default Nav;
