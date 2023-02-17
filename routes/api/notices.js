const express = require('express');
const validateBody = require('../../middlwares/ValidateBody');
const validateNotice = require('../../validation/noticeValidation');

const {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
} = require('../../controllers/notices');

const {
  createNotice,
  noticeInfo,
  updateFavoriteNotice,
  favoriteNotices,
} = require('../../controllers/notices/notices.controller');

const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const noticesRouter = express.Router();

const validatePost = validateBody(validateNotice);

noticesRouter.post('/', tryCatchWrapper(createNotice));
noticesRouter.get('/:noticeId', tryCatchWrapper(noticeInfo));
noticesRouter.patch(
  '/:userId/favorite/:noticeId',
  tryCatchWrapper(updateFavoriteNotice),
);
noticesRouter.get('/:userId/favorite', tryCatchWrapper(favoriteNotices));

noticesRouter.post(
  '/category/:category',
  validatePost,
  tryCatchWrapper(addNotice),
);
noticesRouter.get('/category/:category', tryCatchWrapper(getNoticesByCategory));
noticesRouter.get('/:category/:title', tryCatchWrapper(getByCategoryAndTitle));

module.exports = noticesRouter;
