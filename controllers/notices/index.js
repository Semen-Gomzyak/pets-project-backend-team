const addNotice = require('./addNotice');
const getNoticesByCategory = require('./getNoticesByCategory');
const getByCategoryAndTitle = require('./getByCategoryAndTitle');
const addOrRemoveFavoriteNotice = require('./addOrRemoveFavoriteNotice');
const getFavoriteNotices = require('./getFavoriteNotices');
const getNoticeById = require('./getNoticeById');
const getUserNotices = require('./getUserNotices');
const deleteUserNotice = require('./deleteUserNotice');

module.exports = {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
  addOrRemoveFavoriteNotice,
  getFavoriteNotices,
  getNoticeById,
  getUserNotices,
  deleteUserNotice,
};
