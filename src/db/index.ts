import { Sequelize } from "sequelize/types";
const { DataTypes } = require("sequelize");
import Products from "./models/products.model";

function setupModels(sequelize: Sequelize): void {
  Products(sequelize, DataTypes);
}

export default setupModels;
// module.exports = setupModels;
