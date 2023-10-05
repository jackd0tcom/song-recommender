import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import GenresForm from "./GenresForm";

const EditGenresForm = () => {
  const [genres, setGenres] = useState("");

  useEffect(() => {
    const updateGenres = async () => {
      await axios.put("/api/updateUser", { genres });
    };
    updateGenres();
  }, [genres]);

  useEffect(() => {
    axios.get("/api/checkUser").then((res) => setGenres(res.data.genres));
  }, []);

  return (
    <form>
      <GenresForm genres={genres} setGenres={setGenres} />
    </form>
  );
};

export default EditGenresForm;
