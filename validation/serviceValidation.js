const Joi = require('joi');

const serviceValidate = Joi.object({
  title: Joi.string().min(2).max(128).required(),
  workDays: Joi.array(),
  address: Joi.string(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  imageUrl: Joi.string().min(2).max(128).required(),
})

module.exports = serviceValidate;
