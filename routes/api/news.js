const express = require('express');
const { tryCatchWrapper } = require('../../middlwares/index');
const router = express.Router();

const { getNews, findNewsByTitle } = require('../../controllers/news/index');

router.get('/', tryCatchWrapper(getNews));

router.get(
  '/:title',
  tryCatchWrapper(async (req, res, next) => {
    const title = req.params.title;
    res.status(200).json(await findNewsByTitle(title));
  }),
);

module.exports = router;
