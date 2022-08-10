import { Sequelize } from "sequelize";
import { DataTypes } from "sequelize";
import Products from "./models/products.model";
import Orders from "./models/order.model";
import Review from "./models/review.model";
import Users from "./models/users.model";
import Address from "./models/address.model";
import Categories from "./models/categories.model";
import Favorites from "./models/favorites.model";
import ProductOrders from "./models/product_orders.model";
import ProductCategories from "./models/product_categories.model";

//console.log(Sequelize);
function setupModels(sequelize: Sequelize): void {
  // const order = Orders(sequelize, DataTypes);
  // const products = Products(sequelize, DataTypes);
  // const address = Address(sequelize, DataTypes);
  // const users = Users(sequelize, DataTypes);
  // const review = Review(sequelize, DataTypes);
  // const favorites = Favorites(sequelize, DataTypes);
  // const categories = Categories(sequelize, DataTypes);
  // const productOrders = ProductOrders(sequelize, DataTypes);
  // const productCategories = ProductCategories(sequelize, DataTypes);

  // productCategories.associate(sequelize.models);
  // products.associate(sequelize.models);
  // order.associate(sequelize.models);
  // address.associate(sequelize.models);
  // users.associate(sequelize.models);
  // review.associate(sequelize.models);
  // favorites.associate(sequelize.models);
  // categories.associate(sequelize.models);
  // productOrders.associate(sequelize.models);

  const order = Orders(sequelize, DataTypes);
  const products = Products(sequelize, DataTypes);
  const address = Address(sequelize, DataTypes);
  const users = Users(sequelize, DataTypes);
  const review = Review(sequelize, DataTypes);
  const favorites = Favorites(sequelize, DataTypes);
  const categories = Categories(sequelize, DataTypes);
  const productOrders = ProductOrders(sequelize, DataTypes);
  const productCategories = ProductCategories(sequelize, DataTypes);
  products.associate(sequelize.models);
  order.associate(sequelize.models);
  address.associate(sequelize.models);
  users.associate(sequelize.models);
  review.associate(sequelize.models);
  favorites.associate(sequelize.models);
  categories.associate(sequelize.models);
  productOrders.associate(sequelize.models);
  productCategories.associate(sequelize.models);
}

export default setupModels;
// module.exports = setupModels;
