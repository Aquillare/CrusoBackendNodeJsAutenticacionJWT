const Joi = require('joi');

const token = Joi.string();
const newPassword = Joi.string().min(5).max(15);

const changePasswordSchema = Joi.object({
  token : token.required(),
  newPassword : newPassword.required()
});

module.exports = { changePasswordSchema };
