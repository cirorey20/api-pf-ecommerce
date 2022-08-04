import { Model, UUIDV4 } from "sequelize";

interface ProductCategoriesAttributes {
  id: string;
}

export default (sequelize: any, DataTypes: any) => {
  class ProductCategories
    extends Model<ProductCategoriesAttributes>
    implements ProductCategoriesAttributes
  {
    id!: string;
    static associate(models: any) {
      //ProductCategories.belongsTo(models.Orders);
      ProductCategories.belongsTo(models.Products);
      ProductCategories.belongsTo(models.Categories);
    }
  }
  ProductCategories.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "ProductCategories",
    }
  );
  return ProductCategories;
};
