import { Model, UUIDV4 } from "sequelize";

interface ProductOrdersAttributes {
  id: string;
  quantity: number;
  price: number;
}

export default (sequelize: any, DataTypes: any) => {
  class ProductOrders
    extends Model<ProductOrdersAttributes>
    implements ProductOrdersAttributes
  {
    id!: string;
    quantity!: number;
    price!: number;
    static associate(models: any) {
      ProductOrders.belongsTo(models.Orders);
      ProductOrders.belongsTo(models.Products);
    }
  }
  ProductOrders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ProductOrders",
    }
  );
  return ProductOrders;
};
