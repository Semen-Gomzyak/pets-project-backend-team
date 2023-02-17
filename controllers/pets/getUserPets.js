const Pet = require('../../models/pet');
const idValidation = require('../../validation/idValidation');

async function getUserPets(req, res, next) {
  const { owner } = req.params;
  idValidation(owner);

  const curentUserId = req.user._id;
  if (!curentUserId.equals(owner)) {
    return res
      .status(401)
      .json({ message: 'Not authorize to get another user data' });
  }

  try {
    const userPets = await Pet.find(
      { owner },
      { _id: 0, name: 1, date: 1, breed: 1, comments: 1, avatarURL: 1 },
    );

    if (!userPets.length) {
      return res
        .status(404)
        .json({ message: `User <${owner}> don't have pets` });
    }

    res.status(200).json(userPets);
  } catch (error) {
    next(error);
  }
}

module.exports = getUserPets;
