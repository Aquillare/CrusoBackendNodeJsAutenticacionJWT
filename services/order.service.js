const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {

  constructor() {}

  async create(data) {
      const customer = await models.Customer.findAll({
        where:{
          '$user.id$' : data
        },
        include:['user']
      });
      if(!customer){
        throw boom.unauthorized('No es un cliente valido');
      }else{
        const customerId = {...customer}['0'].dataValues.id;
        const order = await models.Order.create({customerId:customerId});
        return order;
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

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        }
      ]
    });
    return orders;
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
