const mongoose = require('mongoose');
const HttpError = require('../middlwares/HttpError');

const idValidation = id => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw HttpError(400, '_id is not valid');
  }
};

module.exports = idValidation;
