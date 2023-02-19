const userRegistration = require('./userRegistration');
const userLogin = require('./userLogin.js');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateAvatar = require('./updateAvatar');
const updateAllData = require('./updateUser');
const verifyEmail = require('./verifyEmail');
const repeatVerifyEmail = require('./repeatVerifyEmail');

module.exports = {
  userRegistration,
  userLogin,
  logout,
  getCurrentUser,
  updateAvatar,
  updateAllData,
  verifyEmail,
  repeatVerifyEmail,
};
