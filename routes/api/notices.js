const express = require('express');
const validateBody = require('../../middlwares/ValidateBody');
const validateNotice = require('../../validation');

const {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
  getNoticeById,
  addOrRemoveFavoriteNotice,
  getFavoriteNotices,
  getUserNotices,
} = require('../../controllers/notices');

const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const noticesRouter = express.Router();

const validatePost = validateBody(validateNotice);

noticesRouter.post(
  '/category/:category',
  validatePost,
  tryCatchWrapper(addNotice),
);

noticesRouter.post('/', tryCatchWrapper(addNotice));
noticesRouter.get('/category/:category', tryCatchWrapper(getNoticesByCategory));

noticesRouter.get('/:noticeId', tryCatchWrapper(getNoticeById));

noticesRouter.patch(
  '/:userId/favorite/:noticeId',
  tryCatchWrapper(addOrRemoveFavoriteNotice),
);

noticesRouter.get('/:userId/favorite', tryCatchWrapper(getFavoriteNotices));

noticesRouter.get('/:category/:title', tryCatchWrapper(getByCategoryAndTitle));

noticesRouter.get('/', tryCatchWrapper(getUserNotices));

module.exports = noticesRouter;