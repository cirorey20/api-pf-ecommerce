import { Sequelize } from "sequelize";

import setupModels from "../db";

import { config } from "./config";

// const dbUrlLocal: string = `postgres://${config.dbUser}:${config.dbPassword}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const url: string = `${config.dbUrl}`;

interface Options {
  dialect: any,
  logging: boolean
  dialectOptions: object
}

let options: Options = {
  dialect: 'postgres', //elijo la db que voy a utilizar
  logging: config.isProd ? false : true,
  dialectOptions: {}
 }
  
 if(config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized:false
    }
  }
 }
 
 

// const sequelize: Sequelize = new Sequelize(dbUrl, {
//   dialect: "postgres",
//   logging: true,
// });
const sequelize = new Sequelize(url, options);

setupModels(sequelize);
sequelize.sync({ force: false });

export default sequelize;
