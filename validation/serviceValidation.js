const Joi = require('joi');

const serviceValidate = Joi.object({
  name: Joi.string().min(2).max(128).required(),
  time: Joi.string(),
  address: Joi.string(),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  website: Joi.string().min(2).max(128).required(),
})

module.exports = serviceValidate;