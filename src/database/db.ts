import { Sequelize } from "sequelize";
import { database } from "../config/app";

export const connectDB = new Sequelize(
  database.dbase,
  database.username,
  database.password,
  {
    dialect: 'postgres',
    host: database.host,
    port: database.port
  }
);