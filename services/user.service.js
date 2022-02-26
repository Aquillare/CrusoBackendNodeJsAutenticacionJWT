const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class UserService {

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err) );
  };

  async create(data){
    try{
      const hash = await bcrypt.hash(data.password, 10)
      const newUser = await models.User.create({
        ...data,
        password: hash
      });
      delete newUser.dataValues.password;
      return newUser;
    }catch (err){
      throw err;
    }
  };

  async find(){
    const users = await models.User.findAll({
      include:['customer']
    });
    if(!users){
      throw boom.notFound('users not found');
    }
    return users;
  };

  async findByEmail(email){
    const user = await models.User.findOne({
      where : { email }
    });
    return user;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound('user not found');
    }
    return user;
  };

  async update(id, changes){
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  };

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {id}
  };

}

module.exports = UserService;




//models contiene los modelName de los modelos de las tablas
//de la DB.
