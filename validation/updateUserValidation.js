const Joi = require('joi');

const updateUserValidate = Joi.object({
  name: Joi.string().min(2).max(128).required(),
  email: Joi.string().email().required(),
  mobilePhone: Joi.string()
    .regex(/^\+380\d{9}$/)
    .required(),
  cityRegion: Joi.string()
    .regex(/^[A-Za-z]+,[\sA-Za-z]+$/)
    .required(),
});

module.exports = updateUserValidate;
