const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class UserService {

  constructor(){
    this.pool = pool;
    this.pool.on('error', (err) => console.log(err) );
  };

  async create(data){
    try{
      const newUser = await models.User.create(data);
      return newUser
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
