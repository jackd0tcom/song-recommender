import { DataTypes, Model } from "sequelize";
import url from "url";
import connectToDb from "./db.js";

const db = await connectToDb("postgresql:///users");

class User extends Model {}
User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    userImg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    modelName: "users",
    sequelize: db,
  }
);

class Likes extends Model {}
Likes.init(
  {
    artistIds: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    genres: {
      type: DataTypes.STRING,
    },
  },
  { modelName: "likes", sequelize: db }
);

User.hasOne(Likes, { foreignKey: "userId" });
Likes.belongsTo(User, { foreignKey: "userId" });

if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log("Syncing database...");
  await db.sync({ force: true });
  await db.close();
  console.log("Finished syncing database!");
}

export { User, Likes };
