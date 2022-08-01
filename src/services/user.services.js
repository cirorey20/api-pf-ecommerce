const {models} = require('../../libs/sequelize');

class UserService {

  constructor() {
  }

  async find() {
    const rta = await models.User.findAll();
    return rta;
  }

}

module.exports = UserService