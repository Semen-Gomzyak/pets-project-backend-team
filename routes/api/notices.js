const express = require('express');
const validateBody = require('../../middlwares/ValidateBody');
const { validateNotice } = require('../../validation');
const { auth, tryCatchWrapper } = require('../../middlwares');

const {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
  getNoticeById,
  addOrRemoveFavoriteNotice,
  getFavoriteNotices,
  getUserNotices,
  deleteUserNotice,
} = require('../../controllers/notices');
const { upload } = require('../../middlwares/avatar');
const noticesRouter = express.Router();

noticesRouter.post(
  '/category/:category',
  auth,
  validateBody(validateNotice),
  tryCatchWrapper(addNotice),
);

/*
Look after the fronend and delete one of the posts adding notes
*/

noticesRouter.post(
  '/',
  auth,
  upload.single('avatarURL'),
  tryCatchWrapper(addNotice),
);

noticesRouter.get('/category/:category', tryCatchWrapper(getNoticesByCategory));

noticesRouter.get('/:noticeId', tryCatchWrapper(getNoticeById));

noticesRouter.patch(
  '/:userId/favorites/:noticeId',
  auth,
  tryCatchWrapper(addOrRemoveFavoriteNotice),
);
noticesRouter.get(
  '/:userId/favorites/',
  auth,
  tryCatchWrapper(getFavoriteNotices),
);

noticesRouter.get(
  '/category/:category/:title',
  tryCatchWrapper(getByCategoryAndTitle),
);

noticesRouter.get('/', auth, tryCatchWrapper(getUserNotices));

noticesRouter.delete('/:noticeId', auth, tryCatchWrapper(deleteUserNotice));

module.exports = noticesRouter;
