const express = require('express');
const { tryCatchWrapper } = require('../../middlwares/index');
const router = express.Router();

const ctrlNews = require('../../controllers/news/index');

router.get('/', tryCatchWrapper(ctrlNews));

module.exports = router;
