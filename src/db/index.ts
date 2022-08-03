import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import Products from "./models/products.model";
import Orders from "./models/order.model";
import Review from "./models/review.model";
import Users from "./models/users.model";
import Adress from "./models/address.model";
import Categories from "./models/categories.model";
//console.log(Sequelize);
function setupModels(sequelize: Sequelize): void {

  const order = Orders(sequelize, DataTypes);
  const products = Products(sequelize, DataTypes);

  Users(sequelize, DataTypes);
  Adress(sequelize, DataTypes);
  Categories(sequelize, DataTypes);
  Review(sequelize, DataTypes);
  products.associate(sequelize.models);
  order.associate(sequelize.models);
}

export default setupModels;
// module.exports = setupModels;
