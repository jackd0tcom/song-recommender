import { Sequelize } from "sequelize";

async function connectToDb(dbURI) {
  console.log(`Connecting to db: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    dialect: "postgres",
    logging: console.log,
    define: {
      timestamps: false,
      underscored: true,
    },
  });

  try {
    await sequelize.authenticate();
    console.log("Connected to DB successfully");
  } catch (err) {
    console.error("unable to connect to db:", err);
  }

  return sequelize;
}

export default connectToDb;
