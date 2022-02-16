const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class categoryService {

  constructor() {};

  async create(data){
    try{
      const newCategory = await models.Category.create(data);
      return newCategory;
    }catch(err){
      throw err;
    }
  }

  async find(){
    const categories =  await models.Category.findAll();
    return categories;
  }

  async findOne(id){
    const category = await models.Category.findByPk(id , {
      include:['products'],
    });
    if(!category){
      throw boom.notFound('category not found');
    }
    return category;
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const updateProduct = await product.update(changes);
    return updateProduct;
  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return {id};
  }
};

module.exports = categoryService;
