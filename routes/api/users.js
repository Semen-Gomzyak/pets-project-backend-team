const express = require('express');
const usersRouter = express.Router();
const { tryCatchWrapper } = require('../../middlwares');
const { auth, validateBody } = require('../../middlwares');
const { upload } = require('../../middlwares/avatar');

const {
  userRegistration,
  userLogin,
  logout,
  getCurrentUser,
  updateAvatar,
  updateAllData,
  verifyEmail,
  repeatVerifyEmail,
} = require('../../controllers/users');

const { validateRegistration, loginValidation } = require('../../validation');

usersRouter.post(
  '/register',
  validateBody(validateRegistration),
  tryCatchWrapper(userRegistration),
);

usersRouter.post(
  '/login',
  validateBody(loginValidation),
  tryCatchWrapper(userLogin),
);

usersRouter.post('/logout', auth, tryCatchWrapper(logout));

usersRouter.get('/current', auth, tryCatchWrapper(getCurrentUser));

usersRouter.put('/update', auth, tryCatchWrapper(updateAllData));

usersRouter.post(
  '/avatars',
  auth,
  upload.single('avatar'),
  tryCatchWrapper(updateAvatar),
);

// usersRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
// usersRouter.get('/verify', tryCatchWrapper(repeatVerifyEmail));

module.exports = usersRouter;
