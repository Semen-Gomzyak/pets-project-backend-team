const express = require('express');
const petsRouter = express.Router();

const { petValidation } = require('../../validation');
const { tryCatchWrapper, validateBody, auth, uploadImg } = require('../../middlwares');
const ctrl = require('../../controllers/pets');
const isValidId = require('../../helpers/isValidId');

// petsRouter.get('/', tryCatchWrapper());

// petsRouter.get('/:petId', validateBody(petValidation), tryCatchWrapper());

petsRouter.post(
  '/',
  auth,
  validateBody(petValidation),
  uploadImg.single("petsImg"),
  tryCatchWrapper(ctrl.addPet),
);

petsRouter.delete('/petId', auth, isValidId, tryCatchWrapper(ctrl.removePet));

module.exports = petsRouter;
