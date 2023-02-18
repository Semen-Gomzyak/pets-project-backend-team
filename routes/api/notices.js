const express = require('express');
const validateBody = require('../../middlwares/ValidateBody');
const validateNotice = require('../../validation');

<<<<<<< Updated upstream
const {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
  getNoticeById,
  addOrRemoveFavoriteNotice,
  getFavoriteNotices,
  getUserNotices,
} = require('../../controllers/notices');
=======
// const {
//   addNotice,
//   getNoticesByCategory,
//   getByCategoryAndTitle,
// } = require('../../controllers/notices');
>>>>>>> Stashed changes

const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const noticesRouter = express.Router();

const validatePost = validateBody(validateNotice);

<<<<<<< Updated upstream
=======
noticesRouter.post('/', tryCatchWrapper(createNotice));
noticesRouter.get('/:noticeId', tryCatchWrapper(noticeInfo));
noticesRouter.patch(
  '/:userId/favorite/:noticeId',
  tryCatchWrapper(updateFavoriteNotice),
);
noticesRouter.get('/:userId/favorite', tryCatchWrapper(favoriteNotices));

// const validateBody = require('../../middlwares/ValidateBody');
// const validateNotice = require('../../validation/noticeValidation');
// const { notices: enpoint } = require('../../controllers')

const {
  addNotice,
  getNoticesByCategory,
  getByCategoryAndTitle,
} = require('../../controllers');

// const validatePost = validateBody(validateNotice);

>>>>>>> Stashed changes
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