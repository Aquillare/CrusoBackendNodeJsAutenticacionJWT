const { User , UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Product, ProductSchema } = require('./product.model');
const { Category , CategorySchema } = require('./category.model');
const { Order, OrderSchema } = require('./order.model');
const { OrderProduct, OrderProductSchema } = require('./order-product.model');

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  OrderProduct.init(OrderProductSchema, OrderProduct.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;


/*
  lo que hacemos aca es definir una función que usara el
  método estático init() de la clase User, la clase user
  extiende este método de la clase Model de sequelize.

  init crea una nueva tabla para la db, recibe dos
  argumentos, el primer argumento es nuestro schema
  de usuario, es decir como hemos definido los atributos
  que queremos para la tabla, como segundo argumento
  recibe las opciones que las establecemos mediante el
  método estático .config() que creamos para la clase
  User, con .config() establecemos valores como nombre
    de la tabla, nombre del modelo,


*/
