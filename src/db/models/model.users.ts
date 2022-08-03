
import { Model, UUIDV4 } from 'sequelize';

interface UserAttributes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol: string;
    avatar: string;
    date: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class User extends Model<UserAttributes>
    implements UserAttributes {
        id!: number;
        name!: string;
        last_name!: string;
        email!: string;
        password!: string;
        rol!: string;
        avatar!: string;
        date!: string;
        static associate(models: any) {

        }
    };
    User.init({
        id: {
            type: DataTypes.NUMBER,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        sequelize,
        modelName: 'User'
    });
    return User
}