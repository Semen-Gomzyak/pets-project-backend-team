const express = require('express');
const usersRouter = express.Router();
const { tryCatchWrapper } = require('../../middlwares');
<<<<<<< Updated upstream
const { auth } = require('../../middlwares');
const { upload } = require("../../middlwares/avatar");

=======
const { auth, validateBody } = require('../../middlwares');
const { upload, avatarResize } = require('../../middlwares/avatar');
>>>>>>> Stashed changes
const {
  register,
  //   login,
  logout,
  updateAllData,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  repeatVerifyEmail,
} = require('../../controllers/auth.controller');

const {
<<<<<<< Updated upstream
=======
  userRegistration,
  userLogin,
  getUserInfo,
  updateUser,
} = require('../../controllers/users');

const {
>>>>>>> Stashed changes
  validateRegistration,
  loginValidation,
  updateUserValidate,
} = require('../../validation');
<<<<<<< Updated upstream
const validateBody = require('../../middlwares/ValidateBody');

=======
>>>>>>> Stashed changes

usersRouter.post('/register', tryCatchWrapper(register));
// usersRouter.post('/login', tryCatchWrapper(login));
usersRouter.post('/logout', tryCatchWrapper(logout));
usersRouter.put('/update', auth, tryCatchWrapper(updateAllData));
usersRouter.get('/current', auth, tryCatchWrapper(getCurrentUser));
<<<<<<< Updated upstream

usersRouter.post('/avatars', auth, upload.single('avatar'), tryCatchWrapper(updateAvatar));

usersRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
usersRouter.get('/verify', tryCatchWrapper(repeatVerifyEmail));

=======
usersRouter.post(
  '/avatars',
  auth,
  upload.single('avatar'),
  avatarResize,
  tryCatchWrapper(updateAvatar),
);
usersRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
usersRouter.get('/verify', tryCatchWrapper(repeatVerifyEmail));

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
usersRouter.get('/userinfo/:userId', auth, tryCatchWrapper(getUserInfo));
>>>>>>> Stashed changes


module.exports = usersRouter;
