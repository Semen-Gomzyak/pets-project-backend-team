const Joi = require('joi');

const loginValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required().regex(/^\S+$/),
});

module.exports = loginValidation;