import axios from "axios";

export default {
  // controller functions
  register: async (req, res) => {
    try {
      console.log("register");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  login: async (req, res) => {
    try {
      console.log("login");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  checkUser: async (req, res) => {
    try {
      console.log("checkUser");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
  logout: async (req, res) => {
    try {
      console.log("logout");
    } catch (err) {
      console.log(err);
      res.sendStatus(500).send("somthing broke");
    }
  },
};
