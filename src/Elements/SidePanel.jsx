import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditGenresForm from "./EditGenresForm";
import Login from "../Elements/Login";
import ArtistCard from "./ArtistsForm";
import Nav from "./Nav";

const SidePanel = () => {
  return (
    <div className="flex flex-col w-1/3 my-4 ml-4 bg-neutral-800 rounded h-max-full justify-evenly">
      <ArtistCard />
      <EditGenresForm />
    </div>
  );
};

export default SidePanel;
