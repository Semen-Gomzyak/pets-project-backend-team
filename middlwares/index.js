const auth = require('./auth');
const HttpError = require('./HttpError');
const validateBody = require('./ValidateBody');
const removePngOrJpgFromString = require('./removePngOrJpgFromString');
const tryCatchWrapper = require('./tryCatchWrapper');

const sendMail = require('./sendMail');
const updateCloudinaryAvatar = require('./uploadMiddleware');
const upload = require('./avatar');

module.exports = {
  auth,
  HttpError,
  validateBody,
  removePngOrJpgFromString,
  tryCatchWrapper,
  sendMail,
  updateCloudinaryAvatar,
  upload,
};
