import { Model, UUIDV4 } from 'sequelize';

interface OrderAttributes {
    id: number;
    user_id: number;
    address_id: number;
    total: number;
    state: string;
    date: string;
    time: string
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Order extends Model<OrderAttributes>
    implements OrderAttributes {
        id!: number;
        user_id!: number;
        address_id!: number;
        total!: number;
        state!: string;
        date!: string;
        time!: string;
        static associate(models: any) {
        }
    };
    Order.init({
       id: {
          type: DataTypes.UUID,
          defaultValue: UUIDV4,
          allowNull: false,
          primaryKey: true
        
       } ,
       user_id: {
          type: DataTypes.NUMBER,
          allowNull: false,
    },
       address_id: {
        type: DataTypes.NUMBER,
        allowNull: false,
       },
       total: {
        type: DataTypes.NUMBER,
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
        modelName: 'Order'
    });
    return Order;
};