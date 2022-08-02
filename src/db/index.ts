import { Sequelize } from "sequelize/types";

// const { User, UserSchema } = require('./user.model.js');
import { User, UserSchema } from "./models/user.model";
import { Product, ProductSchema } from "./models/product.model";

function setupModels(sequelize: Sequelize): void {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
}

export default setupModels;
// module.exports = setupModels;
