const express = require('express');
const ProductService = require('../services/product.service');

//importamos middleware de validacionde informacion y schemas.
const validatorHandler = require('../middleware/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');


//creamos una variable que contenga el metodo Router de express;
const router = express.Router();

//creamos una instancia de la clase ProductService
const service = new ProductService();



router.get('/',
 validatorHandler(queryProductSchema, 'query'),
 async (req,res,next) => {
  try{
    const products = await service.find(req.query);
    res.json(products);
  }catch(err){
    next(err);
  }

});


//vemaos un ejemplo donde establecemos el id del producto mediante el endpoint
//al metodo get enviaremos el endpoint /products/:id , colocamos dos puntos " : " antes de id, para
//indicar que es un parametro.

router.get('/:id',
validatorHandler(getProductSchema, 'params') ,
 async (req,res,next) => {
    try{
      //mediante destructuracion recibiremos el id del endpoint a traves de la propidedad params de request
      const { id } = req.params;

      const product = await service.findOne(id);

      res.status(200).json(product);
    }catch(err){
      next(err);
    }

});

//useremos el metodo post para recibir las solicitudes de creacion de productos
router.post('/',
 validatorHandler(createProductSchema, 'body'),
 async (req,res,next) => {
  try{
    const body = req.body;
    const newProduct = await service.create(body);

    res.status(201).json(newProduct);
  }catch(err){
    next(err)
  }
});

//usaremos el metodo patch para recibir las solicitudes de actualizacion parcial de productos
router.patch('/:id',
 validatorHandler(getProductSchema, 'params'),
 validatorHandler(updateProductSchema,'body'),
 async (req,res,next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const updateProduct = await service.update(id,body);

    res.json(updateProduct);
  }catch(err){
    next(err);
  };

});

//usaremos el metodo delete para recibir las solicitudes de eliminacion de productos
router.delete('/:id',
 validatorHandler(getProductSchema, 'params'),
 async (req, res,next) => {
  try{
    const {id} = req.params;
    const rta = await service.delete(id);

    res.json(rta);
  }catch(err){
      next(err)
  }

});


module.exports = router;
