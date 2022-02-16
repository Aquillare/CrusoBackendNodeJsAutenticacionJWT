const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class CustomerService{

  constructor(){

  }

  async create(data){
    try{
      const newCustomer = await models.Customer.create(data,{
        include:['user']
      });
      return newCustomer;
    } catch(err){
      throw err;
    }
  };

  async find(){
      const customers = await models.Customer.findAll({
        include:['user']
      });
      if(!customers){
        throw boom.notFound('Customers not found');
      }
      return customers;
  };

  async findOne(id){

    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  };

  async update(id, changes){
    const customer = await this.findOne(id);
    const customerUpdate = await customer.update(changes);
    return customerUpdate;
  };

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return {id};
  };

}

module.exports = CustomerService;
