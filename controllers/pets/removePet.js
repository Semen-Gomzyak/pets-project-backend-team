const { HttpError } = require('../../middlwares');
const { Pet } = require('../../models');

const removePet = async (req, res) => {
  const result = await Pet.findByIdAndDelete(req.params.petId);

  if (!result) {
    throw HttpError(404, 'Not found');
  }

  res.json({ message: 'delete success' });
};

module.exports = removePet;
