
import { Model, UUIDV4 } from 'sequelize';

interface UsersAttributes {
    id: number;
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol: string;
    enable: true;
    avatar: string;
    date: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model<UsersAttributes>
    implements UsersAttributes {
        id!: number;
        name!: string;
        last_name!: string;
        email!: string;
        password!: string;
        rol!: string;
        enable!: true;
        avatar!: string;
        date!: string;
        static associate(models: any) {
            
        }
    };
    Users.init({
        id: {
            type: DataTypes.INTEGER,
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
        enable: {
            type: DataTypes.BOOLEAN,
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
        modelName: 'Users'
    });
    return Users
}