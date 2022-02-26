const express = require('express');
const passport = require('passport');
const { getOrderSchema , createOrderSchema , addItemSchema} = require('../schemas/order.schema');
const validatorHandler = require('../middleware/validator.handler');
const OrderService = require('../services/order.service');


const service = new OrderService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const orders = await service.find();
    res.json(orders);
  }catch(err){
    next(err);
  }
});

router.get('/:id',
 validatorHandler( getOrderSchema , 'params'),
 async (req,res,next) => {
   try{
    const { id } = req.params;
    const order = await service.findOne(id);
    res.status(200).json(order);
   }catch(err){
     next(err);
   }
});

router.post('/',
passport.authenticate('jwt', {session:false}),
async (req,res,next) => {
  try{
    const user = req.user;
    const newOrder = await service.create(user.sub);
    res.status(201).json(newOrder);
  }catch(err){
    next(err);
  }
});

router.post('/add-item',
validatorHandler(addItemSchema, 'body'),
async (req,res,next) => {
  try{
    const body = req.body;
    const newItem = await service.addItem(body);
    res.status(201).json(newItem);
  }catch(err){
    next(err);
  }
});

module.exports = router;
