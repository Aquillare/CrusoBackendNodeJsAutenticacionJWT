const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middleware/auth.handler');
const ProductService = require('../services/product.service');
const AWS = require('aws-sdk');
const config = require('../config/config');

//importamos middleware de validacionde informacion y schemas.
const validatorHandler = require('../middleware/validator.handler');
const {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema } = require('../schemas/product.schema');
const { cloudEndpoint } = require('../config/config');


//creamos una variable que contenga el metodo Router de express;
const router = express.Router();

//creamos una instancia de la clase ProductService
const service = new ProductService();


//const spacesEndpoint = new AWS.Endpoint(config.cloudEndpoint);

const s3 = new AWS.S3({
  endpoint: `https://${config.cloudEndpoint}`,
});

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
passport.authenticate('jwt', {session : false}),
checkRoles('admin'),
 validatorHandler(createProductSchema, 'body'),
 async (req,res,next) => {
  try{
    const body = req.body;
    const image = req.files.image;
    const idd = Math.ceil(Math.random() * 1000);

    const uploadObject = await s3.putObject({
      ACL: 'public-read',
      Bucket: config.bucketName,
      Body:image.data,
      Key: `${idd}${image.name}`,
    }).promise();

    const urlImage = `https://${config.bucketName}.${config.cloudEndpoint}/${idd}${image.name}`;
    const data = {
      ...body,
      image: urlImage,
    };

    const newProduct = await service.create(data);
    res.status(201).json(newProduct);
  }catch(error){
    next(error);
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
    const image = req.files.image;
    const idd = Math.ceil(Math.random() * 1000);


      /*para eliminar la imagen que ya no sera usada de la nube*/
      const product = await service.findOne(id);
      console.log(product);
      const keyImage = product.image.slice(46);
      console.log(keyImage)

      const deleteObject = await s3.deleteObject({
        Bucket: config.bucketName,
        Key: keyImage,
      }).promise();

      console.log(deleteObject);


    /*actualizando el producto*/

    const uploadObject = await s3.putObject({
      ACL: 'public-read',
      Bucket: config.bucketName,
      Body:image.data,
      Key: `${idd}${image.name}`,
    }).promise();

    const urlImage = `https://${config.bucketName}.${config.cloudEndpoint}/${idd}${image.name}`;

    const data = {
      ...body,
      categoryId: parseInt(body.categoryId),
      image: urlImage,
    };



    const updateProduct = await service.update(id,data);



    res.json(updateProduct);
  }catch(err){
    next(err);
  };

});

//usaremos el metodo delete para recibir las solicitudes de eliminacion de productos
router.delete('/:id',
 passport.authenticate('jwt', {session : false}),
 checkRoles('admin'),
 validatorHandler(getProductSchema, 'params'),
 async (req, res,next) => {
  try{
    const {id} = req.params;

    /*para eliminar la imagen que ya no sera usada de la nube*/
    const product = await service.findOne(id);
    const keyImage = product.image.slice(46);

    const deleteObject = await s3.deleteObject({
      Bucket: config.bucketName,
      Key: keyImage,
    }).promise();

    const rta = await service.delete(id);

    res.json(rta);
  }catch(err){
      next(err)
  }

});


module.exports = router;



