const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'last_name',
  },
  email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
  },
  password: {
      allowNull: false,
      type: DataTypes.STRING,
  },
  role: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'user'
  },
  avatar: {
    allowNull: true,
    type: DataTypes.STRING
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  }

}

class User extends Model {
    static associate(models) {
      //associations
      
    }
    static config(sequelize) {
      return {
        sequelize,
        tableName: USER_TABLE,
        modelName: 'User',
        timestamps: false
      }
    }
  }
  
  module.exports = {
    USER_TABLE,
    UserSchema,
    User
  }