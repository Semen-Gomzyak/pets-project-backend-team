const express = require('express');
const router = express.Router();

const { tryCatchWrapper, validateBody } = require('../../middlwares');
const { serviceValidate } = require('../../validation');

const { updateUser } = require('../../controllers/users');

router.patch(
  '/:properties',
  validateBody(serviceValidate),
  tryCatchWrapper(updateUser),
);

module.exports = router;
