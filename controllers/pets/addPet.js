const { Pet } = require('../../models');
const { updateCloudinaryAvatar } = require('../../middlwares');

const addPet = async (req, res) => {
  const { _id } = req.user;
  const avatarURL = await updateCloudinaryAvatar(req, res);

  const newPet = await Pet.create({ ...req.body, owner: _id, avatarURL });
  return res.status(201).json(newPet);
};

module.exports = addPet;
