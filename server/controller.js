import axios from "axios";

const DATA = {
  username: "jack",
  password: "test",
  fname: "jack",
  lname: "ball",
};

export default {
  // controller functions
  addUser: async (req, res) => {
    console.log("hit");
    try {
      console.log("hit");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
};
