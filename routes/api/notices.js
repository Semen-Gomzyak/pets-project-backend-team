const express = require('express');
const noticesRouter = express.Router();
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const {
  createNotice,
  noticeInfo,
  updateFavoriteNotice,
  favoriteNotices,
} = require('../../controllers/notices/notices.controller');

noticesRouter.post('/', tryCatchWrapper(createNotice));
noticesRouter.get('/:noticeId', tryCatchWrapper(noticeInfo));
noticesRouter.patch('/:noticeId', tryCatchWrapper(updateFavoriteNotice));
noticesRouter.get('/:userId/favorite', tryCatchWrapper(favoriteNotices));



module.exports = noticesRouter;
