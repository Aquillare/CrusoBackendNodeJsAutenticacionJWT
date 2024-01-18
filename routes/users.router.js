const express = require('express');
const userService = require('../services/user.service');
const passport = require('passport');

//importamos middleware de validacion de informacion y schemas
const validatorHandler = require('../middleware/validator.handler');
const { checkRoles} = require('../middleware/auth.handler');
const {createUserSchema, updateUserSchema, getUserSchema} = require('../schemas/user.schema');

//creamos una variable router que contenga el metodo Router de expressç
const router = express.Router();

//creamos una instancia de userService
const service = new userService();


router.get('/',
passport.authenticate('jwt', {session:false}),
checkRoles('admin'),
 async (req, res, next) => {
  try{
     const categories = await service.find();
     res.json(categories);
    } catch(err) {
      next(err);
    }
});


router.get('/:id',
 passport.authenticate('jwt', {session:false}),
 checkRoles('admin'),
 validatorHandler(getUserSchema, 'params'),
 async (req,res,next) => {
  try{
    const {id} = req.params;
    const category = await service.findOne(id);
    res.json(category);
  }catch(err){
    next(err);
  }
});

router.post('/',
 validatorHandler(createUserSchema, 'body'),
 async (req,res,next)=> {
  try{
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch(err){
    next(err);
  };
});

router.post('/admin',
 passport.authenticate('jwt', {session:false}),
 checkRoles('admin') ,
 validatorHandler(createUserSchema, 'body'),
 async (req,res,next)=> {
  try{
    const body = req.body;
    const newCategory = await service.create(body);
    res.status(201).json(newCategory);
  } catch(err){
    next(err);
  };
});

router.patch('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles('admin'),
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
async (req,res,next) => {
  try {
    const {id} = req.params;
    const body = req.body;
    const category = await service.update(id, body);
    res.json(category);
  } catch (err) {
    next(err);
  };
});

router.delete('/:id',
passport.authenticate('jwt', {session:false}),
checkRoles('admin'),
validatorHandler(getUserSchema, 'params'),
async (req,res,next) => {
  try{
    const {id} = req.params;
    await service.delete(id);
    res.status(201).json({id})
  } catch(err) {
    next(err);
  }
});



module.exports = router;
