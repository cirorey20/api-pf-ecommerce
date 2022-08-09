// const {Sequelize} = require('sequelize');
import dotenv from 'dotenv';
dotenv.config();
import { Sequelize } from "sequelize";

// const setupModels = require('../db/models/index');
import setupModels from "../db";

// const {config} = require('../config/config');
import { config } from "./config";

// const dbUrl: string = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const url: any = process.env.DATABASE_URL

const sequelize: Sequelize = new Sequelize(url, {
  dialect: "postgres",
  logging: true,
});

setupModels(sequelize);
sequelize.sync({ force: true });

export default sequelize;
// module.exports = sequelize;
