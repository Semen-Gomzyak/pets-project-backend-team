const express = require('express');
const router = express.Router();
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const { validateRegistration, loginValidation } = require('../../validation');
const validateBody = require('../../middlwares/ValidateBody');
const auth = require('../../middlwares/auth');

const {
  userRegistration,
  userLogin,
  getUserById,
} = require('../../controllers/users');

router.post(
  '/register',
  validateBody(validateRegistration),
  tryCatchWrapper(userRegistration),
);
router.get('/login', validateBody(loginValidation), tryCatchWrapper(userLogin));
router.get('/:userId', auth, tryCatchWrapper(getUserById));

module.exports = router;
