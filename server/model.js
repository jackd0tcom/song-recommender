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
  },
  {
    modelName: "users",
    sequelize: db,
  }
);

class Likes extends Model {}
Likes.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    artistIds: {
      type: DataTypes.STRING,
    },
    artists: {
      type: DataTypes.STRING,
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
