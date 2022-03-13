const express = require('express');
const passport = require('passport');
const { getOrderSchema , createOrderSchema , addItemSchema} = require('../schemas/order.schema');
const validatorHandler = require('../middleware/validator.handler');
const OrderService = require('../services/order.service');
const { addAbortSignal } = require('nodemailer/lib/xoauth2');


const service = new OrderService();

const router = express.Router();

router.get('/',
passport.authenticate('jwt', {session:false}),
async (req, res, next) => {
  try{
    const user = req.user
    const orders = await service.findByUser(user.sub);
    res.json(orders);
  }catch(err){
    next(err);
  }
});

router.get('/:id',
 passport.authenticate('jwt', {session:false}),
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
passport.authenticate('jwt', {session:false}),
validatorHandler(addItemSchema, 'body'),
async (req,res,next) => {
  try{
    const data = req.body;
    const newItem = await service.addItem(data);
    res.status(201).json(newItem);
  }catch(err){
    next(err);
  }
});

module.exports = router;
