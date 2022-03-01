
const Joi = require('joi');

const email = Joi.string().email();
const password =  Joi.string();
const token = Joi.string();
const newPassword = Joi.string().min(5).max(20);

const loginSchema = Joi.object({
  email : email.required(),
  password : password.required()
})

const recoveryPasswordSchema = Joi.object({
  email : email.required()
})

const changePasswordSchema = Joi.object({
  token : token.required(),
  newPassword : newPassword.required()
});


module.exports = { changePasswordSchema, loginSchema, recoveryPasswordSchema};
