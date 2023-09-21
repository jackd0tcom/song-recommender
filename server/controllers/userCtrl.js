import { Song } from "../model.js";

export default {
  addSong: async (req, res) => {
    try {
      const { song, artist, album, albumCover, url } = req.body;
      const { userId } = req.session.user;
      const newSong = await Song.create({
        userId,
        song,
        artist,
        album,
        albumCover,
        url,
      });
      res.send(newSong);
    } catch (err) {
      res.send(err);
      console.log(err);
    }
  },
  getAllSongs: async (req, res) => {
    try {
      const { userId } = req.session.user;
      const songs = await Song.findAll({ where: { userId } });
      res.send(songs);
    } catch (err) {
      console.log(err);
    }
  },
};
