const Joi = require('Joi');

const validateRegistration = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .regex(/^[^\s]{7,32}$/)
    .required(),
  name: Joi.string().required(),
  cityRegion: Joi.string()
    .regex(/^[A-Za-z]+,[\sA-Za-z]+$/)
    .required(),
  mobilePhone: Joi.string()
    .regex(/^\+380\d{9}$/)
    .required(),
})

module.exports = validateRegistration;