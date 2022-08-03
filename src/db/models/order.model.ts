import { Model, UUIDV4 } from 'sequelize';

interface OrdersAttributes {
    id: string;
    user_id: string;
    address_id: string;
    state: string;
    date: string;
    time: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Orders extends Model<OrdersAttributes>
    implements OrdersAttributes {
        id!: string;
        user_id!: string;
        address_id!: string;
        state!: string;
        date!: string;
        time!: string;
        static associate(models: any) {
        }
    };
    Orders.init({
       id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true   
       } ,
       user_id: {
          type: DataTypes.STRING,
          allowNull: false,
    },
       address_id: {
        type: DataTypes.STRING,
        allowNull: false,
       },
       state: {
          type: DataTypes.STRING,
          allowNull: false,
       },
       date: {
          type: DataTypes.STRING,
          allowNull: false,
       },
       time: {
          type: DataTypes.STRING,
          allowNull: false,
       },
    },
     {
        sequelize,
        modelName: 'Orders'
    });
    return Orders;
};