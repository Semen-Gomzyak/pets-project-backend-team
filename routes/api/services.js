const express = require('express');
const { tryCatchWrapper } = require('../../middlwares');
const { getServices } = require('../../controllers/services');

const router = express.Router();

router.get("/", tryCatchWrapper(getServices));

module.exports = router;