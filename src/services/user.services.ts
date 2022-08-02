// const {models} = require('../../libs/sequelize');
import { Model } from 'sequelize';
import sequelize from '../libs/sequelize';

class UserService {

  constructor() {
  }

  async find() {
    const rta:Model[] = await sequelize.models.User.findAll();
    return rta;
  }

}

export default UserService;
// module.exports = UserService