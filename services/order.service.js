const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor() {}

  async create(data) {
    try{
      const order = await models.Order.create(data);
      return order;
    }catch(err){
      throw err;
    }
  }

  async  addItem(data){
    try{
      const item = await models.OrderProduct.create(data);
      return item;
    }catch(err){
      throw err;
    }
  }

  async find(){
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id, {
      include:[
        {
          association: 'customer',
          include:['user']
        },
        'items'
      ]
    });
    if(!order){
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, changes){
    const order = await this.findOne(id);
    const orderUpdate = await order.update(changes);
    return orderUpdate;
  }

  async delete(id){
    const order = await this.findOne(id);
    await order.destroy();
    return {id};
  }
}

module.exports = OrderService;
