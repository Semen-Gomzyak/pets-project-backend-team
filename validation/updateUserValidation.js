const Joi = require('joi');

const updateUserValidate = Joi.object({
  name: Joi.string().min(3).max(20),
  email: Joi.string().email(),
  mobilePhone: Joi.string().regex(/^\+380\d{9}$/),
  cityRegion: Joi.string().regex(/^[A-Za-z]+,[\sA-Za-z]+$/),
  birthday: Joi.string().regex(
    /(3[01]|[12][0-9]|0[1-9]).(1[0-2]|0[1-9]).[0-9]{4}$/,
  ),
});

module.exports = updateUserValidate;
