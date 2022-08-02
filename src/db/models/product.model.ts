// const { Model, DataTypes, Sequelize } = require('sequelize');
import { Model, DataTypes, Sequelize } from "sequelize";

const PRODUCT_TABLE:string = 'products';

const ProductSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  decription: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    // defaultValue: Sequelize.NOW
    defaultValue: DataTypes.NOW
  }

}

class Product extends Model {
    static associate(models:any) {
      //associations
      
    }
    static config(sequelize:Sequelize) {
      return {
        sequelize,
        tableName: PRODUCT_TABLE,
        modelName: 'Product',
        timestamps: false
      }
    }
  }
  

  export {
    PRODUCT_TABLE,
    ProductSchema,
    Product
  }