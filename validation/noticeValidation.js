const Joi = require('joi');

const validateNotice = Joi.object({
  title: Joi.string().min(2).max(48).required(),
  name: Joi.string().min(2).max(24).required(),
  birthdate: Joi.date().required('valid format date : mm.dd.yyyy'),
  breed: Joi.string().min(2).max(24),
  location: Joi.string().required(),
  theSex: Joi.string().required(),
  comments: Joi.string().min(8).max(120).required(),
  price: Joi.number().positive(),
  category: Joi.string(),
  favorite: Joi.string(),
  avatarURL: Joi.string(),
  owner: Joi.object(),
});

const updateValidateNotice = Joi.object({
  // title: Joi.string().min(2).max(48).required(),
  // name: Joi.string().min(2).max(24).required(),
  // birthdate: Joi.date().required('valid format date : mm.dd.yyyy'),
  // breed: Joi.string().min(2).max(24),
  // location: Joi.string().required(),
  // theSex: Joi.string().required(),
  // comments: Joi.string().min(8).max(120).required(),
  // price: Joi.number().positive(),
  // category: Joi.string(),
  // favorite: Joi.string(),
  // avatarURL: Joi.string(),
  // owner: Joi.object(),
});

module.exports = (validateNotice, updateValidateNotice);
