const express = require('express');
const router = express.Router();
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const {
  validateRegistration,
  loginValidation,
  updateUserValidate,
} = require('../../validation');
const validateBody = require('../../middlwares/ValidateBody');
const auth = require('../../middlwares/auth');

const {
  userRegistration,
  userLogin,
  getUserById,
  updateUser,
} = require('../../controllers/users');

router.post(
  '/register',
  validateBody(validateRegistration),
  tryCatchWrapper(userRegistration),
);
router.get('/login', validateBody(loginValidation), tryCatchWrapper(userLogin));
router.get('/:userId', auth, tryCatchWrapper(getUserById));

router.patch(
  '/:properties',
  auth,
  validateBody(updateUserValidate),
  tryCatchWrapper(updateUser),
);

module.exports = router;
