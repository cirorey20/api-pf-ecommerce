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

// const sequelize: Sequelize = new Sequelize(url, {
//   dialect: "postgres",
//   logging: false,
//   ssl: false
// });
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(url, {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        },
        // keepAlive: true,
      },
      ssl: true
    })
    : new Sequelize(url, {
      logging: false,
      native: false
    })

setupModels(sequelize);
sequelize.sync({ force: false });

export default sequelize;
// module.exports = sequelize;
