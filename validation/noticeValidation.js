const Joi = require('joi');
const moment = require('moment');

const validateNotice = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(24).required(),
  birthdate: Joi.string(),
  breed: Joi.string().min(2).max(24),
  location: Joi.string().required(),
  theSex: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  category: Joi.string(),
});


module.exports = validateNotice;
