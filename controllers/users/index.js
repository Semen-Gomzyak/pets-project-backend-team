const userRegistration = require('./userRegistration');
const userLogin = require('./userLogin.js');
const logout = require('./logout');
const getCurrentUser = require('./getCurrentUser');
const updateAvatar = require('./updateAvatar');
const updateAllData = require('./updateUser');

module.exports = {
  userRegistration,
  userLogin,
  logout,
  getCurrentUser,
  updateAvatar,
  updateAllData,
};
