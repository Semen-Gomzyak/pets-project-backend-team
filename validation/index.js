const loginValidation = require('./loginValidation');
const petValidation = require('./petValidation');
const validateNotice = require('./noticeValidation');
const validateRegistration = require('./registrationValidation');
const serviceValidate = require('./serviceValidation');
const newsValidate = require('./newsValidation');
const updateUserValidate = require('./updateUserValidation');

module.exports = {
  loginValidation,
  petValidation,
  validateNotice,
  validateRegistration,
  serviceValidate,
  newsValidate,
  updateUserValidate,
};
