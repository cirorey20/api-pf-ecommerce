import { Model, UUIDV4 } from "sequelize";

interface OrdersAttributes {
  id: string;
  state: string;
  date: Date;
  time: string;
  address_order: string;
  payment_method: string;
  customer: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Orders extends Model<OrdersAttributes> implements OrdersAttributes {
    id!: string;
    state!: string;
    date!: Date;
    time!: string;
    address_order!: string;
    payment_method!: string;
    customer!: string;

    static associate(models: any) {
      //una order puede tener muchos productos
      Orders.belongsTo(models.Users);
      Orders.hasMany(models.ProductOrders);
    }
  }

  Orders.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      address_order: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      payment_method: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      customer: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Orders",
    }
  );
  return Orders;
};
