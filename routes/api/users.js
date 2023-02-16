const express = require('express');
const router = express.Router();
const { tryCatchWrapper } = require('../../middlwares');

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
router.post(
  '/login',
  validateBody(loginValidation),
  tryCatchWrapper(userLogin),
);
router.get('/userinfo/:userId', auth, tryCatchWrapper(getUserById));

router.patch(
  '/userupdate/:userId',
  auth,
  validateBody(updateUserValidate),
  tryCatchWrapper(updateUser),
);

module.exports = router;
