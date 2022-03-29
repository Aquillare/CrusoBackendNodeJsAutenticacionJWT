const boom = require('@hapi/boom');
const { Op } = require('sequelize');

const { models } = require('../libs/sequelize');


class ProductService {

  async create(data){
    try{
      const newProduct = await models.Product.create(data);
      return newProduct;
    }catch(err){
      throw err;
    }
  }

  async find(query){
    const options = {
      include:['category'],
      where:{}
    }

    const {limit , offset} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if(price){
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if(price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max
      }
    }

    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id){
      const product = await models.Product.findByPk(id);
      if(!product){
       throw boom.notFound('Product not found');

      }if(product.isBlock){
        throw boom.conflict('Product is block');
      }else{
        return product;
      }
  }

  async update(id, changes){
    try{
      const product = await this.findOne(id);
      const updateProduct = await product.update(changes);
      return updateProduct;
    }catch(err){
      throw err;
    }
  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return { id }
  }
}

module.exports = ProductService;
