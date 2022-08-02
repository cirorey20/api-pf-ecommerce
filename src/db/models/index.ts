import { Sequelize } from "sequelize/types";

// const { User, UserSchema } = require('./user.model.js');
import { User, UserSchema } from './user.model';

function setupModels(sequelize:Sequelize):void {
    User.init(UserSchema, User.config(sequelize));
}

export default setupModels;
// module.exports = setupModels;