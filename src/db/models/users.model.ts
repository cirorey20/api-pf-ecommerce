
import { Model, UUIDV4, Sequelize } from 'sequelize';

interface UsersAttributes {
    id: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    rol: string;
    enable: boolean;
    avatar: string;
    date: string;
}

module.exports = (sequelize: any, DataTypes: any) => {
    class Users extends Model<UsersAttributes>
    implements UsersAttributes {
        id!: string;
        name!: string;
        last_name!: string;
        email!: string;
        password!: string;
        rol!: string;
        enable!: boolean;
        avatar!: string;
        date!: string;
        static associate(models: any) {
            
        }
    };
    Users.init({
        id: {
            type: DataTypes.UUID,
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
            defaultValue: true,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        sequelize,
        modelName: 'Users'
    });
    return Users
}