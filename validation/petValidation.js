const Joi = require('Joi');
const moment = require('moment');

const petValidation = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  date: Joi.date()
    .greater(moment().subtract(20, 'years').toDate())
    .less(moment().toDate())
    .required(),
  breed: Joi.string().alphanum().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).required(),
})

module.exports = petValidation;
