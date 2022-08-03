import { Sequelize } from "sequelize/types";
import { DataTypes } from "sequelize";
import Products from "./models/products.model";
import Orders from "./models/order.model";
import Review from "./models/review.model";
import Users from "./models/users.model";
import Adress from "./models/address.model";
import Categories from "./models/categories.model";

function setupModels(sequelize: Sequelize): void {
  Products(sequelize, DataTypes);
  Orders(sequelize, DataTypes);
  Users(sequelize, DataTypes);
  Adress(sequelize, DataTypes);
  Categories(sequelize, DataTypes);
  Review(sequelize, DataTypes);
}

export default setupModels;
// module.exports = setupModels;
