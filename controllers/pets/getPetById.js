const { Pet } = require('../../models');

const getPetById = async petId => {
  const pet = Pet.findById(petId);
  return pet;
};

module.exports = getPetById;
