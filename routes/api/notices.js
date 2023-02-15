const express = require('express');
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');
const validateBody = require('../../middlwares/ValidateBody');
const validateNotice = require('../../validation/noticeValidation');
const { addNotice } = enpointFn;
const router = express.Router();

const validatePost = validateBody(validateNotice);

router.post('/category/:category', validatePost, tryCatchWrapper(addNotice));
router.get('/category/:category',);
router.get('/:category/:title',);


module.exports = router;