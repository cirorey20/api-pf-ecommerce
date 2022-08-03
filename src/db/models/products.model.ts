import { Model, UUIDV4 } from "sequelize";

interface ProductsAttributes {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  date: string;
  category_id: number;
}

export default (sequelize: any, DataTypes: any) => {
  class Products
    extends Model<ProductsAttributes>
    implements ProductsAttributes
  {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    stock!: number;
    image!: string;
    date!: string;
    category_id!: number;
    static associate(models: any) {}
  }
  Products.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.number,
        allowNull: false,
      },
      stock: {
        type: DataTypes.number,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.number,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
