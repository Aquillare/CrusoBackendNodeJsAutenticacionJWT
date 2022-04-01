const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middleware/auth.handler');
const categoryService = require('../services/category.service');
const AWS = require('aws-sdk');
const config = require('../config/config');

//creamos una variable router que contenga el metodo Router de express
const router = express.Router();

//importamos el middleware de validacion de informacion y el schema
const validatorHandler = require('../middleware/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema} = require('../schemas/category.schema');


//creamos una instancia de la calse categoryService
const service = new categoryService();

//AWS.config.update({ region:'us-east-2' });

const spacesEndpoint = new AWS.Endpoint(config.cloudEndpoint);

const s3 = new AWS.S3({
  endpoint: `https://${config.cloudEndpoint}`,
});


router.get('/', async (req,res,next) => {
  try{
    const categories = await service.find();
    res.json(categories);
  }catch (err) {
    next(err);
  }
});

router.get('/:id',
passport.authenticate('jwt', {session : false}),
checkRoles('admin','customer'),
validatorHandler(getCategorySchema, 'params'),
async (req,res,next) => {
  try{
    const {id} = req.params;
    const category = await service.findOne(id);
    res.json(category);
  } catch (err){
    next(err);
  }
});

router.post('/',
passport.authenticate('jwt', {session : false}),
checkRoles('admin'),
validatorHandler(createCategorySchema, 'body'),
async(req,res,next) => {
  try{
    const body = req.body;
    const image = req.files.image;

    const uploadObject = await s3.putObject({
      ACL: 'public-read',
      Bucket: config.bucketName,
      Body:image.data,
      Key: image.name,
    }).promise();

    const urlImage = `https://${config.bucketName}.${config.cloudEndpoint}/${image.name}`;
    const data = {
      ...body,
      image: urlImage,
    };

    const newCategory = await service.create(data);
    res.status(201).json(newCategory);
  } catch(err) {
    next(err);
  }
});

router.patch('/:id',
passport.authenticate('jwt', { session:false }),
checkRoles('admin'),
validatorHandler(getCategorySchema, 'params'),
validatorHandler(updateCategorySchema, 'body'),
async (req,res,next) => {
  try{
    const { id } = req.params;
    const body = req.body;
    const image = req.files.image;

      /*para eliminar la imagen que ya no sera usada de la nube*/
      const categoryElement = await service.findOne(id);
      console.log(categoryElement);
      const keyImage = categoryElement.image.slice(46);
      console.log(keyImage)

      const deleteObject = await s3.deleteObject({
        Bucket: config.bucketName,
        Key: keyImage,
      }).promise();

      console.log(deleteObject);


    /*actualizando la categoria*/

    const uploadObject = await s3.putObject({
      ACL: 'public-read',
      Bucket: config.bucketName,
      Body:image.data,
      Key: image.name,
    }).promise();

    const urlImage = `https://${config.bucketName}.${config.cloudEndpoint}/${image.name}`;

    const data = {
      ...body,
      image: urlImage,
    };


    const category = await service.update(id,data);
    res.json(category);
  } catch(err) {
    next(err);
  }
});

router.delete('/:id',
passport.authenticate('jwt', { session:false }),
checkRoles('admin'),
validatorHandler(getCategorySchema, 'params'),
async(req,res,next) => {
  try{
    const {id} = req.params;
    await service.delete(id);
    res.status(201).json({id});
  } catch(err) {
    next(err);
  }
});

module.exports = router;
