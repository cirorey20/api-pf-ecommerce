import { Model, UUIDV4 } from "sequelize";

interface CategoriesAttributes {
  id: number;
  name: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Categories
    extends Model<CategoriesAttributes>
    implements CategoriesAttributes
  {
    id!: number;
    name!: string;
    static associate(models: any) {}
  }
  Categories.init(
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
    },
    {
      sequelize,
      modelName: "Categories",
    }
  );
  return Categories;
};