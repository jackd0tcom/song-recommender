import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditGenresForm from "./EditGenresForm";
import Login from "../Elements/Login";
import ArtistCard from "./ArtistsForm";

const SidePanel = () => {
  return (
    <div className="side-panel">
      <ArtistCard />
      <br />
      <EditGenresForm />
      <br />
    </div>
  );
};

export default SidePanel;
