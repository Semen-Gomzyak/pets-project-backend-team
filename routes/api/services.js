const express = require('express');
const router = express.Router();

const { tryCatchWrapper } = require('../../middlwares');

const { getServices } = require('../../controllers/services');

router.get("/", tryCatchWrapper(getServices));

module.exports = router;