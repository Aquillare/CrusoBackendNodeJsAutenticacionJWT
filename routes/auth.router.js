const express = require('express');
const passport = require('passport');
const validatorHandler = require('../middleware/validator.handler');
const { changePasswordSchema, loginSchema , recoveryPasswordSchema} = require('../schemas/auth.schema');
const AuthService = require('../services/auth.service');
const UserService = require ('../services/user.service');

const service = new AuthService();
const userService = new UserService();

const router = express.Router();

router.post('/login',
 validatorHandler(loginSchema) ,
 passport.authenticate('local', {session: false}),
 async(req, res, next) => {
  try{
    const user = req.user;
    res.json(service.singToken(user));
  }catch(error){
    next(error);
  }
});

router.post('/recovery',
 validatorHandler(recoveryPasswordSchema, 'body'),
 async(req, res, next) =>{
  try{
    const { email } = req.body;
    const mailSent= await service.sendRecovery(email);
    res.json(mailSent);
  }catch(error){
    next(error);
  }
});

router.post('/change-password',
  validatorHandler(changePasswordSchema, 'body'),
  async(req, res, next) => {
    try{
      const { token , newPassword } = req.body;
      const statusPassword = await service.changePassword( token, newPassword);
      res.json(statusPassword);
    }catch(error){
      next(error);
    }
});

router.get('/profile',
  passport.authenticate('jwt', {session:false}),
  async(req, res, next) => {
    try{
      userR = req.user;
      const user = await userService.findOne(userR.sub);
      const userData = {
        email: user.email,
        role: user.role,
      };
      res.json(userData);
    }catch(error){
      next(error);
    };
  }
)

module.exports = router;
