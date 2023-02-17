const express = require('express');
const { tryCatchWrapper } = require('../../middlwares');
const { auth } = require('../../middlwares');
const { upload, avatarResize} = require("../../middlwares/avatar");
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

const usersRouter = express.Router();

usersRouter.post('/register', tryCatchWrapper(register));
usersRouter.post('/login', tryCatchWrapper(login));
usersRouter.post('/logout', tryCatchWrapper(logout));
usersRouter.put('/update', auth, tryCatchWrapper(updateAllData));
usersRouter.get('/current', auth, tryCatchWrapper(getCurrentUser));
usersRouter.post('/avatars', auth, upload.single('avatar'), avatarResize(), tryCatchWrapper(updateAvatar));
usersRouter.get('/verify/:verificationToken', tryCatchWrapper(verifyEmail));
usersRouter.get('/verify', tryCatchWrapper(repeatVerifyEmail));

module.exports = usersRouter;
