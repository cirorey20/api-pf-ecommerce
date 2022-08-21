import { Model, UUIDV4, Sequelize } from "sequelize";
const bcrypt = require("bcryptjs");
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
  authenticated: boolean;
  hash_code: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Users extends Model<UsersAttributes> implements UsersAttributes {
    id!: string;
    name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    rol!: string;
    enable!: boolean;
    avatar!: string;
    date!: string;
    authenticated!: boolean;
    hash_code!: string;
    static associate(models: any) {
      Users.hasMany(models.Orders);
      Users.hasMany(models.Review);
      Users.hasMany(models.Favorites);
      Users.belongsTo(models.Address);
    }
  }
  Users.init(
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
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
          //encriptamos la password que entre
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue("password", hash);
        },
      },
      rol: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      enable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      avatar: {
        type: DataTypes.STRING,
        defaultValue:
          "https://happytravel.viajes/wp-content/uploads/2020/04/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
        // allowNull: false"
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      authenticated: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      hash_code: {
        type: DataTypes.STRING,
        defaultValue: (() => {
          const code = Math.random().toString(36).substring(2, 10);
          const hash = bcrypt.hashSync(code, 10);
          return hash.replace("/", "");
        })(),
      },
    },
    {
      timestamps: true,
      createdAt: false,
      updatedAt: false,
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
