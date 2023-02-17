const { isValidObjectId } = require('mongoose');

const { HttpError } = require('../../middlwares');

const isValidId = (req, res, next) => {
  const { petId } = req.params;

  if (!isValidObjectId(petId)) {
    next(HttpError(404, 'Invalid id'));
  }
  next();
};

module.exports = isValidId;
