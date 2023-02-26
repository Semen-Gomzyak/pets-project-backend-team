const Joi = require('joi');
const moment = require('moment');

const validateNotice = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(24).required(),
  birthdate: Joi.date()
    .greater(moment().subtract(20, 'years').toDate())
    .less(moment().toDate())
    .required('valid format date : mm.dd.yyyy'),
  breed: Joi.string().min(2).max(24),
  location: Joi.string().required(),
  theSex: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().positive(),
  category: Joi.string(),
});


module.exports = validateNotice;
