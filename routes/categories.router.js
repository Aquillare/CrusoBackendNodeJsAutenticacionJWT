const express = require('express');
const passport = require('passport');
const { checkRoles } = require('../middleware/auth.handler');
const categoryService = require('../services/category.service');

//creamos una variable router que contenga el metodo Router de express
const router = express.Router();

//importamos el middleware de validacion de informacion y el schema
const validatorHandler = require('../middleware/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema} = require('../schemas/category.schema');


//creamos una instancia de la calse categoryService
const service = new categoryService();

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
    const newCategory = await service.create(body);
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
    const {id} = req.params;
    const body = req.body;
    const category = await service.update(id, body);
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
