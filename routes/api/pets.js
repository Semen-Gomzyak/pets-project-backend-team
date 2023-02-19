const express = require('express');
const router = express.Router();

const {
  addPet,
  getUserPets,
  getPetById,
  removePet,
} = require('../../controllers/pets');
const { auth, tryCatchWrapper, HttpError } = require('../../middlwares');
const { upload } = require('../../middlwares/avatar');

router.post('/', auth, upload.single('avatar'), tryCatchWrapper(addPet));

router.get('/', auth, tryCatchWrapper(getUserPets));

router.get(
  '/:petId',
  auth,
  tryCatchWrapper(async (req, res, next) => {
    const searchedPet = await getPetById(req.params.petId);
    if (!searchedPet) {
      return next(
        HttpError(404, `Pet with id ${req.params.petId} can't be found`),
      );
    }
    res.status(200).json(searchedPet);
  }),
);
router.delete('/:petId', auth, tryCatchWrapper(removePet));
module.exports = router;
