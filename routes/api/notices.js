const express = require('express');
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');
const validateBody = require('../../middlwares/ValidateBody');
const validateNotice = require('../../validation/noticeValidation');
const { notices: enpoint } = require('../../controllers')

const { addNotice, getNoticesByCategory, getByCategoryAndTitle } = enpoint;
const router = express.Router();

const validatePost = validateBody(validateNotice);

router.post('/category/:category', validatePost, tryCatchWrapper(addNotice));
router.get('/category/:category', tryCatchWrapper(getNoticesByCategory));
router.get('/:category/:title', tryCatchWrapper(getByCategoryAndTitle));


module.exports = router;