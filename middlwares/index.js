const auth = require('./auth');
const HttpError = require('./HttpError');
const validateBody = require('./ValidateBody');
const removePngOrJpgFromString = require('./removePngOrJpgFromString');
const tryCatchWrapper = require('./tryCatchWrapper');

const sendMail = require('./sendMail');
const updateCloudinaryAvatar = require('./uploadMiddleware');

const uploadImg = require("./uploadImg")


module.exports = {
  auth,
  HttpError,
  validateBody,
  removePngOrJpgFromString,
  tryCatchWrapper,

  sendMail,
<<<<<<< HEAD
  updateCloudinaryAvatar,
};
=======

  uploadImg

>>>>>>> ac1d96dc30a15c481159935f0787a219df096ed1
