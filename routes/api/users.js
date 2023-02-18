const express = require('express');
const usersRouter = express.Router();
const { tryCatchWrapper } = require('../../middlwares');
const { auth } = require('../../middlwares');
const { upload } = require("../../middlwares/avatar");

const {
  register,
  login,
  logout,
  updateAllData,
  getCurrentUser,
  updateAvatar,
  verifyEmail,
  repeatVerifyEmail,
} = require('../../controllers/auth.controller');

const {
  validateRegistration,
  loginValidation,
  updateUserValidate,
} = require('../../validation');
const validateBody = require('../../middlwares/ValidateBody');


usersRouter.post('/register', tryCatchWrapper(register));
usersRouter.post('/login', tryCatchWrapper(login));
usersRouter.post('/logout', tryCatchWrapper(logout));
usersRouter.put('/update', auth, tryCatchWrapper(updateAllData));
usersRouter.get('/current', auth, tryCatchWrapper(getCurrentUser));

usersRouter.post('/avatars', auth, upload.single('avatar'), tryCatchWrapper(updateAvatar));

usersRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
usersRouter.get('/verify', tryCatchWrapper(repeatVerifyEmail));



module.exports = usersRouter;
