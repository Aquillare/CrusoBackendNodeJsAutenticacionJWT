const Joi = require('joi');


//es importante que seguido de Join indiquemos primero el tipo de dato, luego la o las validaciones.
const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
//const title = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();  //uri es de url.
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

//definimos un esquema para la creacion productos, que reunira los campos definidos anteriormente. en los esquemas
//indicaremos a traves del metodo requerid() de Joi, si son requeridos.
const createProductSchema = Joi.object({
  name: name.required(),
 //title: title.required(),
  price: price.required(),
  image: image,
  description: description.required(),
  categoryId: categoryId.required()
});

//definimos un esquema para la actualizacion de productos
const updateProductSchema = Joi.object({
  name: name,
  //title: title,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});

//esquema para la solicitud de un producto
//a pesar de que este esquema posee una sola propiedad, es buena practica que sea un un objeto.
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when( 'price_min', {
    is: Joi.exist(),
    then: Joi.required()
  })
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema};
