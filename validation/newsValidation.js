const Joi = require('joi');

const newsValidate = Joi.object({
  title: Joi.string().min(2).max(100).required(),
  text: Joi.string().min(10).max(1000).required(),
  date: Joi.date().required(),
  author: Joi.string().min(2).max(100).required(),
  country: Joi.string().min(2).max(100).required(),
});

module.exports = newsValidate;