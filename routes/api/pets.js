const express = require('express');
const router = express.Router();
const tryCatchWrapper = require('../../middlwares/tryCatchWrapper');

const auth = require('../../middlwares/auth');

const { getUserPets } = require('../../controllers/pets');

router.get('/:owner', auth, tryCatchWrapper(getUserPets));

module.exports = router;
