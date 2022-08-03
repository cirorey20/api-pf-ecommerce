import { Sequelize } from "sequelize/types";
const { DataTypes } = require("sequelize");
import Products from "./models/products.model";
import Categories from "./models/categories.model";

function setupModels(sequelize: Sequelize): void {
  Products(sequelize, DataTypes);
  Categories(sequelize, DataTypes);
}

export default setupModels;
// module.exports = setupModels;
