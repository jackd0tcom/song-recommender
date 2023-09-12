import { User } from "../model.js";
import bcrypt from "bcryptjs";

export default {
  // controller functions
  register: async (req, res) => {
    try {
      const { username, password } = req.body;

      const foundUser = await User.findOne({ where: { username } });

      if (foundUser) {
        res.status(400).send("That username is already taken.");
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await User.create({
          username,
          password: hash,
          fname: "jack",
          lname: "ball",
        });

        req.session.user = {
          userId: newUser.userId,
          username: newUser.username,
        };

        res.status(200).send(req.session.user);
      }
    } catch (err) {
      console.log(err);
      res.sendStatus(500);
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
